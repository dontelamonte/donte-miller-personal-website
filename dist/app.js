import * as THREE from './vendor/three.module.min.js';
import {ScrollFlow} from './scroll-flow.js';
import {cameraAt,moveHouse,followProgress,TABLE_CAMERA} from './house-path.js?v=smooth-house-6';
import {buildHouse} from './house-scene.js';
import {livingItems} from './living-content.js';
import {ABOUT_CHAPTER_DISTANCE,advanceAbout,storyFrame} from './about-story.js';
import {LIBRARY_SCROLL_DISTANCE,libraryCameraAt} from './library-path.js';
import {advanceLibraryScroll,libraryBookReady} from './library-scroll.js';
import {buildLibrary} from './library-scene.js';
import {curricula,curriculumById} from './library-content.js';

const $ = (id) => document.getElementById(id);
const shell = $('reader-shell');
const scroller = $('reader-scroll');
const paper = $('reader-content');
const intro = $('intro');
const gsap = window.gsap;
const BOOKS = ['press','report','opportunities'];
const aboutParagraphs=[...livingItems.about.body.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g)].map(m=>m[1]);
const aboutText=aboutParagraphs.join(' ');
const ABOUT_DISTANCE=(aboutParagraphs.length+1)*ABOUT_CHAPTER_DISTANCE;
let storyStage='';
const labels = {press:'THE PRESS',report:'TEN-YEAR REPORT',opportunities:'LET’S BUILD'};
const courseIds=curricula.map(item=>item.id);
const nextCourse=id=>courseIds[courseIds.indexOf(id)+1]||null;
const state = {mode:'loading',active:null,token:0,progress:0,houseProgress:0,houseTarget:0,libraryProgress:0,libraryTarget:0,libraryVelocity:0,libraryScrollAmount:0,courseScrollTarget:'flourish',courseCarry:0,aboutOffset:0,journeyVelocity:0,journeyNavigation:false,scrollAmount:0,scrollTarget:'press',autoCooldown:0,reduce:matchMedia('(prefers-reduced-motion: reduce)').matches,touchY:null,courseTouchY:null};
const scrollFlow=new ScrollFlow();
const courseFlow=new ScrollFlow({settleTime:0});
let renderer, scene, camera, photo, portraitImage, house, library, dirty=true, hovered=null, lastFocus=null, livingFocus=null, courseFocus=null;
const target = new THREE.Vector3(0,0,0);
const books = new Map();
const pickables = [];
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const hotspots = [...document.querySelectorAll('.hotspot')];
const livingControls=[...document.querySelectorAll('[data-living]')];
const courseControls=[...document.querySelectorAll('[data-course]')];
const viewport=()=> $('scene').getBoundingClientRect();
function updatePointer(e){const r=viewport();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);}
const canvasHome = {position:new THREE.Vector3(),target:new THREE.Vector3()};
const prefs = matchMedia('(prefers-reduced-motion: reduce)');
const savedReader = new Map();
const pressItems = [
 ['Forbes','30 Under 30: Social Impact','Recognition of Donte’s work making community investment accessible through Village Micro Fund.','https://www.forbes.com/profile/donte-miller/'],
 ['The Bitter Southerner','Investing in Neighbors','A look at cooperative economics, community wealth, and the people behind the Village.','https://bittersoutherner.com/from-the-southern-perspective/hustle/investing-in-neighbors-village-micro-fund-atlanta'],
 ['ShoutOut Atlanta','Meet Donte Miller','The founding story, the journey from Wall Street to Atlanta, and the first community-crowdfunded loan.','https://shoutoutatlanta.com/meet-donte-miller-executive-director-of-village-micro-fund/'],
 ['Samsung × Forbes','Creating New Opportunities','A film about building new pathways for entrepreneurs and investing in community possibility.','https://www.forbes.com/video/26ee448e-59b6-45ff-9c3c-e2d9ff78d3d3'],
 ['Google','A spotlight on Black small businesses','Village Micro Fund’s work featured in Google’s Black History Month coverage.','https://blog.google/outreach-initiatives/small-business/black-history-month-2021/'],
 ['NBC Creative Impact Lab','The work, in motion','Village Micro Fund featured in the NBCUnites Creative Impact Lab showcase.','https://www.youtube.com/watch?v=ga0IfCTF7A4']
];
const escapeHTML=(s)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const masthead=(right)=>`<div class="paper-masthead"><span>DONTE MILLER · THE DINING TABLE</span><span>${right}</span></div>`;
const continuation=(next,title)=>`<footer class="continuation" data-next="${next||''}"><p class="eyebrow">${next?'THERE’S MORE ON THE TABLE':'THANK YOU FOR PULLING UP A CHAIR'}</p><button class="continue-button" type="button" data-continue="${next||''}">${title}<span aria-hidden="true">${next?'↗':'↙'}</span></button><p class="continue-hint">${next?'Keep scrolling — the next publication opens automatically.<br>You can also select the title above.':'Keep scrolling to return to the table.'}</p></footer>`;
function content(id){
 if(id==='press') return masthead('VOL. 01 · SELECTED COVERAGE')+`<h1 class="paper-heading" id="reader-heading" tabindex="-1">The Village,<br>in the world.</h1><p class="paper-subtitle">Conversations, stories, and recognition from the work of building community wealth.</p><img class="paper-hero" src="/assets/akua-ribbon.jpg" alt="Community members celebrating together at a ribbon-cutting"><p class="image-caption">From the Village archive · photograph supplied by Donte Miller</p>`+pressItems.map(([pub,title,description,url],i)=>`<a class="press-row" href="${url}" target="_blank" rel="noopener noreferrer"><span class="press-number">${String(i+1).padStart(2,'0')}</span><div><p class="press-publication">${pub}</p><h2>${title}</h2><p>${description}</p></div><span class="press-arrow" aria-hidden="true">↗</span><span class="sr-only">Opens an external publication in a new tab</span></a>`).join('')+continuation('report','A decade of building together.');
 if(id==='report') return masthead('VILLAGE MICRO FUND · 2015–2025')+`<h1 class="paper-heading" id="reader-heading" tabindex="-1">Ten years.<br>One Village.</h1><p class="paper-subtitle">A decade of teaching, investing, and building the conditions for our communities to thrive.</p><img class="paper-hero" src="/assets/akua-ribbon.jpg" alt="A joyful ribbon-cutting with members of the Village community"><p class="image-caption">A short web edition drawn from Village Micro Fund’s supplied 2015–2025 report.</p><section class="paper-section"><p class="eyebrow">01 · WHERE IT BEGAN</p><h2>Our community is our greatest asset.</h2><p>The report begins with a simple act: a community-crowdfunded loan for Westview Pizza Café. That first investment became a foundation for an institution built around trust, knowledge, and shared economic possibility.</p><p>In their founders’ letter, Donte Miller and Harriett Williams describe the Village as more than loans or workshops. The work is about supporting the whole entrepreneur and building something that lasts.</p><blockquote class="pullquote">“We are our own greatest asset, and we are not waiting for permission to invest in ourselves.”</blockquote></section><div class="report-grid"><section class="paper-section"><p class="eyebrow">02 · TEACH</p><h2>Knowledge is a beginning.</h2><p>The 15-week Flourish Fellowship brings together practical business learning, mentorship, and a community of support. The report describes a program that helps founders step back, strengthen their businesses, and build lasting relationships.</p></section><section class="paper-section"><p class="eyebrow">03 · INVEST</p><h2>Capital with community at its heart.</h2><p>The report documents partnerships with Kiva and Access to Capital for Entrepreneurs, alongside work on new ownership models. The Worker’s Equity Fund explores a path from outside investment toward employee ownership.</p></section></div><section class="paper-section"><p class="eyebrow">04 · SUPPORT</p><h2>Relationships become infrastructure.</h2><p>Stories in the report follow founders working in education, wellness, food, farming, and technology. Connections made through the Village become collaborations, community support, and opportunities to build together.</p><p>The Southwest Atlanta Growers Cooperative story illustrates this approach: individual farms work toward shared resources and a stronger collective voice.</p></section><section class="paper-section"><p class="eyebrow">05 · THE NEXT CHAPTER</p><h2>Building a different economic future.</h2><p>The report’s future vision brings worker ownership, the EnDAO community-governance model, and a Time Bank into a wider cooperative financial ecosystem. It describes a future in which community knowledge, labor, and collective decision-making have a place alongside financial capital.</p><p>These ideas appear here in the context of the report’s 2015–2025 edition. Explore the original for its full histories, stories, and future vision.</p><a class="paper-link" href="https://villagemicrofund.com" target="_blank" rel="noopener noreferrer">Explore Village Micro Fund ↗</a><a class="paper-link" href="/assets/vmf-10-year-report.pdf#page=6" target="_blank" rel="noopener">Read about EnDAO in the report ↗</a></section><aside class="report-original"><img src="/assets/original-report-cover.png" alt="Original Village Micro Fund 10-Year Report cover"><div><h2>The complete report.</h2><p>The original 19-page PDF, including the founders’ letter, success stories, history, and future vision.</p><a class="paper-link" href="/assets/vmf-10-year-report.pdf" target="_blank" rel="noopener">Open the full report ↗</a><a class="paper-link" href="/assets/vmf-10-year-report.pdf" download="Village-Micro-Fund-10-Year-Report.pdf">Download PDF ↓</a></div></aside><p class="source-note">Source: Village Micro Fund / VMF Collective, 2015–2025 Report. This condensed web edition accompanies the original; the full document remains available above.</p>`+continuation('opportunities','What could we build next?');
 return masthead('A NOTE TO THE FUTURE')+`<h1 class="paper-heading" id="reader-heading" tabindex="-1">Let’s build<br>something.</h1><p class="paper-subtitle">A conversation can be the beginning of a new possibility. Here are a few places to start.</p><section class="opportunity"><p class="eyebrow">01 · CONSULTING</p><h2>Think through the system.</h2><p>Start a conversation about community-centered capital, cooperative approaches, or the systems that help entrepreneurs thrive.</p><a href="mailto:donte@villagemicrofund.com?subject=Consulting%20inquiry">Start a consulting conversation ↗</a></section><section class="opportunity"><p class="eyebrow">02 · SPEAKING</p><h2>Bring the conversation to your room.</h2><p>Community investing, entrepreneurship, ownership, and the experience of building an alternative financial institution.</p><a href="mailto:donte@villagemicrofund.com?subject=Speaking%20inquiry">Discuss a speaking opportunity ↗</a></section><section class="opportunity"><p class="eyebrow">03 · PARTNERSHIPS</p><h2>Find the work we share.</h2><p>Have a project, institution, or idea that connects to this work? Introduce yourself and what you have in mind.</p><a href="mailto:donte@villagemicrofund.com?subject=Partnership%20inquiry">Explore a partnership ↗</a></section><p class="source-note">For something that doesn’t fit a category, write to donte@villagemicrofund.com.</p>`+continuation(null,'Back to the table.');
}
function setMode(mode){state.mode=mode;document.documentElement.dataset.mode=mode;document.documentElement.dataset.active=state.active||'';document.body.classList.toggle('scene-opening',['opening','closing','course-opening','course-closing'].includes(mode));document.body.classList.toggle('scene-reading',mode==='reading'||mode==='course-reading');hotspots.forEach(b=>b.disabled=mode!=='exploring');}
function announce(text){$('announcer').textContent=text;}
const invalidate=()=>{dirty=true;};
const invalidateShadows=()=>{if(renderer)renderer.shadowMap.needsUpdate=true;invalidate();};
function duration(n){return state.reduce?0.01:n;}
function look(){camera.lookAt(target);invalidate();}
function routeTo(id,replace=false){const hash=id?'#'+id:'#table';if(location.hash!==hash)history[replace?'replaceState':'pushState']({reader:id},'',hash);}
function decoratePublication(id){
 const details=id==='report'?{eyebrow:'VILLAGE MICRO FUND · 2015–2025',title:'Ten years.<br>One Village.',deck:'The people, ideas, and possibilities behind a decade of building together.',caption:'The ten-year report · A condensed web edition.'}:{eyebrow:'VOL. 01 · SELECTED PRESS',title:'The Village,<br>in the world.',deck:'Conversations and stories from the work of building community wealth.',caption:'From the Village archive · Photograph supplied by Donte Miller.'};
 shell.dataset.publication=id;
 shell.setAttribute('aria-label',id==='opportunities'?'Open opportunities notepad':`Open ${id==='press'?'press magazine':'ten-year report'}`);
 $('inside-cover').innerHTML=`<p class="inside-eyebrow"><span>${details.eyebrow}</span><span>DM.</span></p><h2 class="inside-title">${details.title}</h2><p class="inside-deck">${details.deck}</p><img class="inside-photo" src="/assets/akua-ribbon.jpg" alt=""><p class="inside-caption">${details.caption}</p><div class="inside-folio"><span>DONTE MILLER / THE DINING TABLE</span><span>01</span></div>`;
 $('page-foot-title').textContent=labels[id];
}
function readingReady(id,token){
 if(token!==state.token)return;
 setMode('reading');decoratePublication(id);shell.hidden=false;paper.innerHTML=content(id);
 if(innerWidth>650){if(id==='press')$('reader-heading').innerHTML='Selected<br>conversations.';if(id==='report')$('reader-heading').innerHTML='The story<br>of the Village.';}
 $('reader-label').textContent=labels[id];$('reader-counter').textContent=`0${BOOKS.indexOf(id)+1} / 03`;
 document.title=`${labels[id]} — Donte Miller`;
 scroller.scrollTop=savedReader.get(id)||0;scrollFlow.reset(performance.now());
 gsap.fromTo(shell,{autoAlpha:0},{autoAlpha:1,duration:duration(.32)});
 gsap.fromTo($('open-publication'),{scale:.96},{scale:1,duration:duration(.5),ease:'power2.out'});
 updateProgress();$('reader-heading').focus({preventScroll:true});announce(`${labels[id]}. Publication open.`);
}
function openBook(id,{historyChange=true}={}){
 if(!BOOKS.includes(id)||!['exploring','reading'].includes(state.mode))return;
 if(state.mode==='reading'){if(state.active!==id)closeBook(id,{historyChange});return;}
 gsap.killTweensOf(state);state.journeyNavigation=false;state.journeyVelocity=0;state.libraryProgress=state.libraryTarget=0;state.houseProgress=state.houseTarget=1;state.aboutOffset=ABOUT_DISTANCE;travelCamera();
 const token=++state.token;lastFocus=document.activeElement;state.active=id;setMode('opening');if(historyChange)routeTo(id);
 const b=books.get(id);if(camera){canvasHome.position.copy(camera.position);canvasHome.target.copy(target);}if(!b||!camera||state.reduce){readingReady(id,token);return;}
 const tl=gsap.timeline({onUpdate:invalidateShadows,onComplete:()=>readingReady(id,token)});
 tl.to(b.group.position,{x:0,y:2.8,z:0,duration:duration(.9),ease:'power2.inOut'},0);
 tl.to(b.hinge.rotation,{y:-Math.PI*.96,duration:duration(.7),ease:'power2.inOut'},.3);
 tl.to(target,{x:0,y:2.8,z:0,duration:duration(1),ease:'power2.inOut',onUpdate:look},.1);
 // Keep the camera in front of its target throughout a single approach.
 // Passing directly overhead and then sideways caused the pre-opening twist.
 tl.to(camera.position,{x:0,y:5.45,z:1.8,duration:duration(1.1),ease:'power2.inOut',onUpdate:look},.1);
}
function closeBook(next=null,{historyChange=true,fromStart=false,restartNext=false,roomAfter=null}={}){
 if(state.mode!=='reading')return;
 const previous=state.active,token=++state.token;savedReader.set(previous,scroller.scrollTop);if(next&&restartNext)savedReader.delete(next);setMode('closing');
 const b=books.get(previous);
 const finish=()=>{if(token!==state.token)return;shell.hidden=true;paper.innerHTML='';state.active=null;setMode('exploring');if(historyChange&&!next)routeTo(null);invalidate();if(next){openBook(next,{historyChange});}else{state.scrollAmount=0;state.scrollTarget=fromStart?previous:previous==='opportunities'?'library':BOOKS[BOOKS.indexOf(previous)+1];state.autoCooldown=performance.now()+900;updateTableHint();document.title='Donte Miller — The Dining Table';announce(fromStart?'Returned to the dining table. Scroll down to reopen this publication.':previous==='opportunities'?'Returned to the table. Keep scrolling to visit the library.':'Returned to the dining table. Keep scrolling to open the next object.');const restore=lastFocus?.isConnected&&lastFocus.matches('button,a')?lastFocus:document.querySelector(`[data-open="${previous}"]`);restore?.focus({preventScroll:true});if(roomAfter)goRoom(roomAfter,{historyChange:false});}};
 if(!b||!camera||state.reduce){gsap.to(shell,{autoAlpha:0,duration:duration(.2),onComplete:finish});return;}
 const tl=gsap.timeline({onUpdate:invalidateShadows,onComplete:finish});
 tl.to(shell,{autoAlpha:0,duration:duration(.2)},0);
 tl.to(camera.position,{x:canvasHome.position.x,y:canvasHome.position.y,z:canvasHome.position.z,duration:duration(1.05),ease:'power2.inOut',onUpdate:look},0);
 tl.to(target,{x:canvasHome.target.x,y:canvasHome.target.y,z:canvasHome.target.z,duration:duration(1.05),ease:'power2.inOut',onUpdate:look},0);
 tl.to(b.hinge.rotation,{y:0,duration:duration(.6),ease:'power2.inOut'},.18);
 tl.to(b.group.position,{x:b.home.position.x,y:b.home.position.y,z:b.home.position.z,duration:duration(.9),ease:'power2.inOut'},.3);
 tl.to(b.group.rotation,{x:b.home.rotation.x,y:b.home.rotation.y,z:b.home.rotation.z,duration:duration(.9),ease:'power2.inOut'},.3);
}
function updateProgress(){if(state.mode!=='reading')return;const max=scroller.scrollHeight-scroller.clientHeight;$('read-progress-fill').style.width=`${max>0?100*scroller.scrollTop/max:100}%`;}
function continueReading(){if(state.mode!=='reading')return;const footer=paper.querySelector('[data-next]');closeBook(footer?.dataset.next||null,{restartNext:true});}
function moveReader(delta){
 if(state.mode!=='reading')return;
 const next=scrollFlow.move({delta,top:scroller.scrollTop,max:scroller.scrollHeight-scroller.clientHeight,now:performance.now()});
 scroller.scrollTop=next.top;updateProgress();
 if(next.action==='next')continueReading();
 else if(next.action==='table')closeBook(null,{fromStart:true});
}
scroller.addEventListener('scroll',updateProgress,{passive:true});
shell.addEventListener('wheel',e=>{
 if(state.mode!=='reading'||e.ctrlKey||!e.deltaY)return;
 e.preventDefault();moveReader(e.deltaY*(e.deltaMode===1?18:e.deltaMode===2?scroller.clientHeight:1));
},{passive:false});
shell.addEventListener('touchstart',e=>{state.touchY=e.touches.length===1?e.touches[0].clientY:null;},{passive:true});
shell.addEventListener('touchmove',e=>{if(state.mode!=='reading'||e.touches.length!==1||state.touchY===null)return;const y=e.touches[0].clientY,delta=state.touchY-y;state.touchY=y;e.preventDefault();moveReader(delta);},{passive:false});
for(const event of ['touchend','touchcancel'])shell.addEventListener(event,()=>{state.touchY=null;},{passive:true});
shell.addEventListener('keydown',e=>{if(state.mode!=='reading'||e.target.closest('button,a,input,textarea,select')||e.ctrlKey||e.metaKey||e.altKey)return;const page=Math.max(100,scroller.clientHeight*.9);const delta={ArrowUp:-48,PageUp:-page,ArrowDown:48,PageDown:page,' ':e.shiftKey?-page:page}[e.key];if(delta!==undefined){e.preventDefault();moveReader(delta);}});
paper.addEventListener('click',e=>{const button=e.target.closest('[data-continue]');if(button)continueReading();});
$('return-table').addEventListener('click',()=>closeBook());
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openBook(b.dataset.open)));
$('simple-view').addEventListener('click',()=>openBook('press'));
$('library-shortcut').addEventListener('click',()=>goLibrary());
document.querySelector('.wordmark').addEventListener('click',e=>{e.preventDefault();goRoom('living');});
function courseMarkup(item){
 const title=escapeHTML(item.title),overview=escapeHTML(item.overview);
 const next=nextCourse(item.id),nextTitle=next?escapeHTML(curriculumById[next].title):'';
 const continuation=`<footer class="course-continuation"><p class="eyebrow">${next?'NEXT ON THE SHELF':'END OF THE LIBRARY'}</p><button class="course-next" data-course-continue type="button">${next?`Open ${nextTitle} →`:'Return to the shelf ↙'}</button><p>${next?'Keep scrolling and the next book opens automatically.':'Keep scrolling to return to the shelf.'}</p></footer>`;
 if(item.comingSoon)return `<p class="eyebrow">THE LIBRARY · COMING SOON</p><h1 id="course-heading" tabindex="-1">${title}.</h1><p class="course-deck">${overview}</p><hr class="course-rule"><p>This book is reserved on the shelf. Its lessons and resources will appear when the curriculum is ready.</p>${continuation}`;
 return `<p class="eyebrow">THE LIBRARY · CURRICULUM PREVIEW</p><h1 id="course-heading" tabindex="-1">${title}.</h1><p class="course-deck">${overview}</p><p><strong>For:</strong> ${escapeHTML(item.audience)}</p><hr class="course-rule"><h2>Inside this book.</h2><ol class="course-chapters">${item.chapters.map((name,i)=>`<li>${escapeHTML(name)} ${i?'· Paid chapter':'· Free first chapter'}</li>`).join('')}</ol><hr class="course-rule"><p class="eyebrow">FREE FIRST CHAPTER · SAMPLE TEXT</p><h2>${escapeHTML(item.chapters[0])}.</h2><div class="course-sample"><p>${escapeHTML(item.sample)}</p></div><p class="course-note">This is sample chapter text for the website prototype. The final lessons and downloadable resources will be added with the completed curriculum.</p><button class="course-action" disabled>Buy ${title} — available when pricing and content are ready</button>${continuation}`;
}
function showCourse(id,token){
 if(token!==state.token)return;const item=curriculumById[id],carried=state.courseCarry;state.courseCarry=0;state.active=id;setMode('course-reading');
 $('course-content').innerHTML=courseMarkup(item);$('course-toolbar-title').textContent=item.title.toUpperCase();$('course-shell').hidden=false;$('course-scroll').scrollTop=0;courseFlow.reset(performance.now());
 gsap.fromTo($('course-shell'),{autoAlpha:0},{autoAlpha:1,duration:duration(.35)});
 document.title=`${item.title} — Donte Miller`;$('course-heading').focus({preventScroll:true});announce(`${item.title}. Curriculum preview open.`);
 if(carried>0)setTimeout(()=>{if(token===state.token&&state.mode==='course-reading')moveCourseReader(carried);},260);
}
function openCourse(id,{historyChange=true}={}){
 if(!curriculumById[id]||state.mode!=='exploring'||state.libraryProgress<.98)return;
 const token=++state.token;courseFocus=document.activeElement;state.active=id;state.courseScrollTarget=id;state.libraryScrollAmount=0;setMode('course-opening');$('library-ui').hidden=true;if(historyChange)routeTo(`course-${id}`);
 const b=library.books.get(id);if(state.reduce){showCourse(id,token);return;}
 const tl=gsap.timeline({onUpdate:invalidateShadows,onComplete:()=>showCourse(id,token)});
 tl.to(b.group.position,{z:b.home.position.z+1.15,duration:.38,ease:'power2.out'});
 tl.to(b.group.position,{x:15,y:3.4,z:1.5,duration:.75,ease:'power2.inOut'});
 tl.to(b.group.rotation,{y:0,duration:.75,ease:'power2.inOut'},'<');
 tl.to(b.hinge.rotation,{y:-Math.PI*.86,duration:.55,ease:'power2.inOut'},'-=.42');
}
function closeCourse({historyChange=true,next=null,fromStart=false}={}){
 if(state.mode!=='course-reading')return;const id=state.active,b=library.books.get(id),token=++state.token;setMode('course-closing');
 const finish=()=>{if(token!==state.token)return;$('course-shell').hidden=true;$('course-content').innerHTML='';state.active=null;setMode('exploring');state.courseScrollTarget=fromStart?id:next||id;state.libraryScrollAmount=0;state.autoCooldown=performance.now()+600;travelCamera();if(next){openCourse(next,{historyChange});return;}state.courseCarry=0;$('library-ui').hidden=false;if(historyChange)routeTo('library');document.title='Donte Miller — The Library';(courseFocus?.isConnected&&courseFocus.matches('button')?courseFocus:document.querySelector(`[data-course="${id}"]`))?.focus({preventScroll:true});announce(fromStart?'Returned to the shelf. Scroll down to reopen this book.':'Returned to the library shelf.');};
 if(state.reduce){gsap.to($('course-shell'),{autoAlpha:0,duration:.01,onComplete:finish});return;}
 const tl=gsap.timeline({onUpdate:invalidateShadows,onComplete:finish});tl.to($('course-shell'),{autoAlpha:0,duration:.22},0);tl.to(b.hinge.rotation,{y:0,duration:.42},0);tl.to(b.group.position,{x:b.home.position.x,y:b.home.position.y,z:b.home.position.z,duration:.85,ease:'power2.inOut'},.23);tl.to(b.group.rotation,{y:b.home.rotation.y,duration:.85},.23);
}
$('return-library').addEventListener('click',()=>closeCourse());
$('course-content').addEventListener('click',e=>{if(e.target.closest('[data-course-continue]'))closeCourse({next:nextCourse(state.active)});});
function moveCourseReader(delta){
 if(state.mode!=='course-reading')return;
 const view=$('course-scroll'),next=courseFlow.move({delta,top:view.scrollTop,max:view.scrollHeight-view.clientHeight,now:performance.now()});
 view.scrollTop=next.top;
 if(next.action==='next')closeCourse({next:nextCourse(state.active)});
 else if(next.action==='table')closeCourse({fromStart:true});
}
function queueCourseScroll(delta){if(!Number.isFinite(delta))return;state.courseCarry=delta<0?0:Math.min(240,state.courseCarry+delta);}
$('course-shell').addEventListener('wheel',e=>{if(!['course-reading','course-opening','course-closing'].includes(state.mode)||e.ctrlKey||!e.deltaY)return;e.preventDefault();const delta=e.deltaY*(e.deltaMode===1?18:e.deltaMode===2?$('course-scroll').clientHeight:1);if(state.mode==='course-reading')moveCourseReader(delta);else queueCourseScroll(delta);},{passive:false});
$('course-shell').addEventListener('touchstart',e=>{state.courseTouchY=e.touches.length===1?e.touches[0].clientY:null;},{passive:true});
$('course-shell').addEventListener('touchmove',e=>{if(!['course-reading','course-opening','course-closing'].includes(state.mode)||e.touches.length!==1||state.courseTouchY===null)return;const y=e.touches[0].clientY,delta=state.courseTouchY-y;state.courseTouchY=y;e.preventDefault();if(state.mode==='course-reading')moveCourseReader(delta);else queueCourseScroll(delta);},{passive:false});
for(const event of ['touchend','touchcancel'])$('course-shell').addEventListener(event,()=>{state.courseTouchY=null;},{passive:true});
$('course-shell').addEventListener('keydown',e=>{if(state.mode!=='course-reading'||e.target.closest('button,a,input,textarea,select')||e.ctrlKey||e.metaKey||e.altKey)return;const page=Math.max(100,$('course-scroll').clientHeight*.9),delta={ArrowUp:-48,PageUp:-page,ArrowDown:48,PageDown:page,' ':e.shiftKey?-page:page}[e.key];if(delta!==undefined){e.preventDefault();moveCourseReader(delta);}});
courseControls.forEach(button=>button.addEventListener('click',()=>openCourse(button.dataset.course)));
function setMotion(reduce){state.reduce=reduce;if(reduce&&state.mode==='exploring'){gsap.killTweensOf(state);state.journeyNavigation=false;state.journeyVelocity=state.libraryVelocity=0;state.houseProgress=state.houseTarget;state.libraryProgress=state.libraryTarget;travelCamera();}$('motion-toggle').setAttribute('aria-pressed',String(reduce));$('motion-toggle').textContent=reduce?'Motion reduced':'Reduce motion';}
setMotion(state.reduce);$('motion-toggle').addEventListener('click',()=>setMotion(!state.reduce));prefs.addEventListener('change',e=>setMotion(e.matches));
function applyRoute(){
 const id=location.hash.slice(1);
 if(state.mode==='living-detail')closeLiving({historyChange:false});
 if(state.mode==='course-reading'&&id!==`course-${state.active}`)closeCourse({historyChange:false});
 if(BOOKS.includes(id)){if(state.mode==='exploring')openBook(id,{historyChange:false});else if(state.mode==='reading'&&state.active!==id)closeBook(id,{historyChange:false});}
 else if(id.startsWith('course-')&&curriculumById[id.slice(7)]){if(state.mode==='exploring'){state.houseProgress=state.houseTarget=1;state.libraryProgress=state.libraryTarget=1;travelCamera();openCourse(id.slice(7),{historyChange:false});}}
 else if(id==='library'&&state.mode==='exploring')goLibrary({historyChange:false});
 else if(id==='about'&&state.mode==='exploring'){showAbout();}
 else if(livingItems[id]){if(state.mode==='exploring'){state.houseProgress=state.houseTarget=0;travelCamera();openLiving(id,{historyChange:false});}else if(state.mode==='reading')closeBook(null,{historyChange:false,roomAfter:'living'});}
 else if(['living','dining','table',''].includes(id))goRoom(id||'living',{historyChange:false});
}
window.addEventListener('hashchange',applyRoute);
function travelCamera(){
 if(!camera||!['exploring','loading'].includes(state.mode))return;
 const r=viewport(),inLibrary=state.libraryProgress>.0001||(state.houseProgress>.999&&state.libraryTarget>0),v=inLibrary?libraryCameraAt(state.libraryProgress,r.width/r.height):cameraAt(state.houseProgress,r.width/r.height);
 camera.position.set(...v.position);target.set(...v.target);camera.fov=v.fov;
 if(inLibrary&&state.libraryProgress<.22){const fade=1-(state.libraryProgress/.22)**2*(3-2*state.libraryProgress/.22);camera.position.y-=.8*state.progress*fade;camera.position.z-=1.5*state.progress*fade;}
 if(!inLibrary&&state.houseProgress>.999){const mobile=r.width/r.height<.9;camera.position.set(mobile?0:-1.3,TABLE_CAMERA.position[1]-.8*state.progress,TABLE_CAMERA.position[2]-1.5*state.progress);target.set(mobile?0:-1.3,0,0);}
 camera.updateProjectionMatrix();look();updateHouseUI(v.room);if(state.mode==='exploring'&&!state.journeyNavigation&&!livingItems[location.hash.slice(1)]&&!BOOKS.includes(location.hash.slice(1))&&!location.hash.startsWith('#course-')){if(state.libraryProgress>.999&&state.libraryTarget===1){routeTo('library',true);document.title='Donte Miller — The Library';}else if(state.houseProgress>.999&&state.houseTarget===1&&state.libraryProgress<.001&&state.libraryTarget===0){routeTo('table',true);document.title='Donte Miller — The Dining Table';}else if(state.houseProgress<.001&&state.houseTarget===0){routeTo('living',true);document.title='Donte Miller — Make yourself at home.';}}
}
function updateHouseUI(room){
 const changed=document.documentElement.dataset.room!==room;document.documentElement.dataset.room=room;
 if(changed&&renderer&&camera){const r=viewport();camera.aspect=r.width/r.height;renderer.setSize(r.width,r.height);camera.updateProjectionMatrix();invalidate();}
 const p=state.houseProgress;updateAboutStory();
 $('living-ui').style.opacity=String(Math.max(0,1-p/.24));
 $('living-ui').inert=p>.24||state.mode!=='exploring';
 $('library-ui').hidden=room!=='library'||state.mode!=='exploring';
 $('table-view').style.opacity=String(Math.max(0,1-state.libraryProgress*5));
 $('house-room-label').textContent=room==='living'?'01 / THE LIVING ROOM':room==='library'?'03 / THE LIBRARY':'02 / THE DINING ROOM';
 $('house-scroll-hint').textContent=room==='library'?`Keep scrolling to open ${curriculumById[state.courseScrollTarget].title} ↓`:state.libraryProgress>0?'Through the library doorway →':p<.001&&state.aboutOffset<ABOUT_DISTANCE?'Scroll to read my story ↓':p<.16?'Select a plaque, or keep scrolling ↓':p<.5?'Through the archway →':p<.8?'A seat at the table. Keep scrolling ↓':'A few things to share. Keep scrolling ↓';
 $('journey-progress').style.width=`${100*(state.aboutOffset+p*3400+state.libraryProgress*LIBRARY_SCROLL_DISTANCE)/(ABOUT_DISTANCE+3400+LIBRARY_SCROLL_DISTANCE)}%`;
 document.querySelectorAll('[data-room-go]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.roomGo==='living'?room==='living':b.dataset.roomGo==='library'?room==='library':room==='table'||room==='dining')));
 hotspots.forEach(b=>b.disabled=state.mode!=='exploring'||room!=='table');
 intro.style.opacity=String(1-state.progress*.85);
}
function goRoom(id,{historyChange=true}={}){
 if(id==='dining')id='table';
 if(id==='library'){goLibrary({historyChange});return;}
 if(!['living','table'].includes(id))return;
 if(state.mode==='living-detail')closeLiving({historyChange:false});
 if(state.mode==='reading'){closeBook(null,{historyChange:false,roomAfter:id});if(historyChange)routeTo(id);return;}
 if(state.mode!=='exploring')return;
 if(state.libraryProgress>.001||state.libraryTarget>0){gsap.killTweensOf(state);state.libraryTarget=0;state.journeyNavigation=true;state.scrollAmount=0;if(historyChange)routeTo(id);document.title=id==='living'?'Donte Miller — Make yourself at home.':'Donte Miller — The Dining Table';if(state.reduce){state.libraryProgress=0;state.journeyNavigation=false;if(id==='living')goRoom('living',{historyChange:false});else travelCamera();return;}gsap.to(state,{libraryProgress:0,duration:Math.max(.7,state.libraryProgress*2.1),ease:'power1.inOut',onUpdate:travelCamera,onComplete:()=>{state.journeyNavigation=false;if(id==='living')goRoom('living',{historyChange:false});else{travelCamera();announce('Returned to the table.');}}});return;}
 const progress=id==='living'?0:1;state.aboutOffset=id==='living'?0:ABOUT_DISTANCE;
 state.houseTarget=progress;state.journeyVelocity=0;state.progress=0;state.scrollAmount=0;state.autoCooldown=performance.now()+500;
 gsap.killTweensOf(state);
 if(historyChange)routeTo(id);
 document.title=id==='living'?'Donte Miller — Make yourself at home.':`Donte Miller — ${id==='table'?'The Dining Table':'The Dining Room'}`;
 if(state.reduce){state.journeyNavigation=false;state.houseProgress=progress;travelCamera();announce(`${id==='living'?'Home':'The Table'}.`);return;}
 state.journeyNavigation=true;
 gsap.to(state,{houseProgress:progress,duration:Math.max(.7,Math.abs(progress-state.houseProgress)*4.8),ease:'power1.inOut',onUpdate:travelCamera,onInterrupt:()=>{state.journeyNavigation=false;},onComplete:()=>{state.journeyNavigation=false;announce(`${id==='living'?'Home':'The Table'}.`);}});
}
function goLibrary({historyChange=true}={}){
 if(state.mode==='reading'){closeBook(null,{historyChange:false,roomAfter:'library'});if(historyChange)routeTo('library');return;}
 if(state.mode!=='exploring')return;
 gsap.killTweensOf(state);const needsTable=state.houseProgress<.999;state.houseTarget=1;state.aboutOffset=ABOUT_DISTANCE;if(needsTable)state.progress=0;state.libraryTarget=1;state.scrollTarget='library';state.courseScrollTarget='flourish';state.libraryScrollAmount=0;state.scrollAmount=0;state.journeyVelocity=state.libraryVelocity=0;state.autoCooldown=performance.now()+500;
 if(historyChange)routeTo('library');
 document.title='Donte Miller — The Library';
 if(state.reduce){state.houseProgress=state.libraryProgress=1;travelCamera();announce('The library.');return;}
 state.journeyNavigation=true;const tl=gsap.timeline({onComplete:()=>{state.journeyNavigation=false;travelCamera();announce('The library. Keep scrolling or choose a book.');}});
 if(needsTable)tl.to(state,{houseProgress:1,duration:Math.max(.7,(1-state.houseProgress)*4.2),ease:'power1.inOut',onUpdate:travelCamera});
 tl.to(state,{libraryProgress:1,duration:Math.max(.8,(1-state.libraryProgress)*3.5),ease:'power1.inOut',onUpdate:travelCamera});
}
function updateTableHint(){const names={press:'the press magazine',report:'the ten-year report',opportunities:'the opportunities notepad',library:'the library'};$('table-scroll-hint').textContent=`Keep scrolling to ${state.scrollTarget==='library'?'visit':'open'} ${names[state.scrollTarget]}.`;}
function advanceTable(delta){
 if(state.mode!=='exploring'||performance.now()<state.autoCooldown||!Number.isFinite(delta))return;
 if(state.houseTarget===0&&state.houseProgress<.001&&(state.aboutOffset<ABOUT_DISTANCE||delta<0)){
  const intro=advanceAbout(state.aboutOffset,delta,ABOUT_DISTANCE);state.aboutOffset=intro.offset;updateAboutStory();updateHouseUI('living');delta=intro.overflow;if(!delta)return;
 }
 if(state.libraryTarget>0||state.libraryProgress>.001){
  if(state.journeyNavigation){gsap.killTweensOf(state);state.journeyNavigation=false;}
  state.scrollTarget='library';
  const next=advanceLibraryScroll(state.libraryTarget,state.libraryScrollAmount,delta);state.libraryTarget=next.target;state.libraryScrollAmount=next.pending;
  if(state.reduce){state.libraryProgress=state.libraryTarget;travelCamera();}
  return;
 }
 if(state.houseTarget<1||(delta<0&&state.scrollAmount<=0)){
  const next=moveHouse(state.houseTarget,delta);state.houseTarget=next.progress;state.progress=0;
  if(state.journeyNavigation){gsap.killTweensOf(state);state.journeyNavigation=false;}
  if(state.reduce){state.journeyVelocity=0;state.houseProgress=next.progress;travelCamera();}
  return;
 }
 if(state.houseProgress<.999)return;
 state.progress=THREE.MathUtils.clamp(state.progress+delta*.0007,0,1);
 state.scrollAmount=Math.max(0,state.scrollAmount+delta);
 document.documentElement.dataset.tableProgress=String(Math.min(1,state.scrollAmount/620));travelCamera();
 if(state.scrollAmount>=620){const excess=state.scrollAmount-620;state.scrollAmount=0;if(state.scrollTarget==='library'){const next=advanceLibraryScroll(0,0,excess);state.libraryTarget=next.target;state.libraryScrollAmount=next.pending;state.libraryVelocity=0;document.title='Donte Miller — The Library';travelCamera();}else{savedReader.delete(state.scrollTarget);openBook(state.scrollTarget);}}
}
window.addEventListener('wheel',e=>{if(e.ctrlKey||e.target.closest('.reader-shell,.course-shell,.living-panel,.room-navigation'))return;const delta=e.deltaY*(e.deltaMode===1?18:e.deltaMode===2?innerHeight:1);if(['course-opening','course-closing'].includes(state.mode)){queueCourseScroll(delta);return;}if(state.mode==='exploring')advanceTable(delta);},{passive:true});
let sceneTouch=null;
document.addEventListener('touchstart',e=>{if(state.mode==='exploring'&&e.touches.length===1)sceneTouch=e.touches[0].clientY;},{passive:true});
document.addEventListener('touchmove',e=>{if(state.mode!=='exploring'||sceneTouch===null||e.touches.length!==1)return;advanceTable((sceneTouch-e.touches[0].clientY)*2);sceneTouch=e.touches[0].clientY;},{passive:true});
document.addEventListener('touchend',()=>{sceneTouch=null;},{passive:true});
document.addEventListener('keydown',e=>{if(state.mode==='living-detail'){if(e.key==='Escape'){e.preventDefault();closeLiving();}if(e.key==='Tab'){const nodes=[...$('living-panel').querySelectorAll('button,a,[tabindex="0"]')],first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}return;}if(e.key==='Escape'&&state.mode==='course-reading'){e.preventDefault();closeCourse();return;}if(e.key==='Escape'&&state.mode==='reading'){closeBook();return;}if(state.mode!=='exploring'||e.ctrlKey||e.metaKey||e.target.closest('button,a,input,textarea,select'))return;const delta={ArrowDown:100,PageDown:650,' ':e.shiftKey?-650:650,ArrowUp:-100,PageUp:-650}[e.key];if(delta!==undefined){e.preventDefault();advanceTable(delta);}});
document.querySelectorAll('[data-room-go]').forEach(b=>b.addEventListener('click',()=>goRoom(b.dataset.roomGo)));
function updateAboutStory(){
 const view=storyFrame(state.aboutOffset,ABOUT_DISTANCE),stage=view.welcome?'welcome':'story';
 $('about-story').dataset.stage=stage;
 if(stage!==storyStage){storyStage=stage;$('about-story-label').textContent=view.welcome?'WELCOME TO MY HOUSE':'ABOUT DONTE MILLER';$('about-story-title').textContent=view.welcome?'Make yourself at home.':'A little about me.';$('about-story-text').textContent=view.welcome?'Scroll through my story, then join me at the table.':aboutText;}
 $('about-story-counter').textContent=view.welcome?'SCROLL TO READ':`${Math.round(view.progress*100)}% OF MY STORY`;
 const passage=$('about-story-text'),window=$('about-story-viewport');
 passage.style.transform=`translateY(${-Math.max(0,passage.scrollHeight-window.clientHeight)*view.progress}px)`;
}
function showAbout(){goRoom('living');state.aboutOffset=ABOUT_CHAPTER_DISTANCE*1.25;updateAboutStory();}
function openLiving(id,{historyChange=true}={}){
 if(id==='about'){showAbout();return;}
 if(!livingItems[id]||state.mode!=='exploring')return;
 gsap.killTweensOf(state);state.journeyNavigation=false;state.journeyVelocity=0;state.houseTarget=state.houseProgress;
 livingFocus=document.activeElement;state.active=id;setMode('living-detail');
 const item=livingItems[id];$('living-panel-label').textContent=item.label;$('living-panel-eyebrow').textContent=item.eyebrow;$('living-heading').innerHTML=item.title;$('living-panel-body').innerHTML=item.body;
 $('living-panel').hidden=false;$('living-panel-scroll').scrollTop=0;
 if(historyChange)routeTo(id);document.title=`${item.label} — Donte Miller`;
 gsap.fromTo($('living-panel-paper'),{x:state.reduce?0:35,autoAlpha:0},{x:0,autoAlpha:1,duration:duration(.45)});
 $('living-heading').focus({preventScroll:true});announce(`${item.label}. Details open.`);
}
function closeLiving({historyChange=true}={}){
 if(state.mode!=='living-detail')return;
 $('living-panel').hidden=true;state.active=null;setMode('exploring');travelCamera();state.autoCooldown=performance.now()+500;
 if(historyChange)routeTo('living');document.title='Donte Miller — Make yourself at home.';
 livingFocus?.focus({preventScroll:true});announce('Returned to the living room.');
}
livingControls.forEach(b=>b.addEventListener('click',()=>openLiving(b.dataset.living)));
$('close-living').addEventListener('click',()=>closeLiving());
$('living-panel').addEventListener('click',e=>{if(e.target===$('living-panel'))closeLiving();if(e.target.closest('[data-go-table]')){closeLiving({historyChange:false});goRoom('table');}if(e.target.closest('[data-open-report]')){closeLiving({historyChange:false});state.houseProgress=state.houseTarget=1;state.aboutOffset=ABOUT_DISTANCE;travelCamera();openBook('report');}});

// Browser-native procedural surfaces keep the scene independent of a flat tabletop image.
function seeded(seed=1){return()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};}
function texture(draw,w=1024,h=1024){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=renderer.capabilities.getMaxAnisotropy();return t;}
function grainTexture(){return texture((ctx,w,h)=>{const rng=seeded(38);ctx.fillStyle='#305272';ctx.fillRect(0,0,w,h);for(let row=0;row<9;row++){ctx.fillStyle=row%2?'#183d5c22':'#b4c1c016';ctx.fillRect(0,row*h/9,w,h/9);ctx.fillStyle='#102f4838';ctx.fillRect(0,row*h/9,w,2);}for(let i=0;i<13000;i++){const y=rng()*h,x=rng()*w;ctx.strokeStyle=i%2?'#152f4b16':'#e2dbbf18';ctx.lineWidth=.2+rng();ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x+40,y-3,x+80,y+3,x+80+rng()*170,y);ctx.stroke();}},2048,1024);}
function rugTexture(){return texture((ctx,w,h)=>{const rng=seeded(67);ctx.fillStyle='#b16f45';ctx.fillRect(0,0,w,h);for(let i=0;i<5;i++){ctx.strokeStyle=['#4f5a4e','#d4b183','#93653f','#c6a476','#394f4a'][i];ctx.lineWidth=[20,13,9,11,5][i];ctx.strokeRect(20+i*15,20+i*15,w-40-i*30,h-40-i*30);}for(let y=95;y<h-85;y+=38){for(let x=95;x<w-85;x+=34){const d=((x/34+y/38)|0)%2;ctx.strokeStyle=d?'#41574970':'#e5c19780';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y-9);ctx.lineTo(x+10,y);ctx.lineTo(x,y+9);ctx.lineTo(x-10,y);ctx.closePath();ctx.stroke();ctx.fillStyle='#354c4740';ctx.fillRect(x-2,y-2,4,4);}}for(let i=0;i<140000;i++){ctx.fillStyle=i%2?'#f4dfb51c':'#203d3122';ctx.fillRect(rng()*w,rng()*h,1+rng()*3,.8);}for(let y=0;y<h;y+=3){ctx.fillStyle='#f9efd314';ctx.fillRect(0,y,w,.7);}},1536,1024);}
function photoFill(ctx,x,y,w,h){const ratio=Math.max(w/photo.width,h/photo.height);const dw=photo.width*ratio,dh=photo.height*ratio;ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.drawImage(photo,x+(w-dw)*.5,y+(h-dh)*.5,dw,dh);ctx.restore();}
function coverTexture(id){return texture((ctx,w,h)=>{ctx.fillStyle=id==='report'?'#233d2d':id==='press'?'#f5ecd5':'#f4eddd';ctx.fillRect(0,0,w,h);if(id==='opportunities'){ctx.fillStyle='#2e4536';ctx.font='20px Georgia';ctx.fillText('A NOTE TO THE FUTURE',65,145);ctx.font='70px Georgia';ctx.fillText('Let’s build',65,270);ctx.fillText('something.',65,350);for(let y=450;y<h-80;y+=55){ctx.fillStyle='#adb7ab55';ctx.fillRect(50,y,w-100,1);}ctx.fillStyle='#9a5036';ctx.font='22px Georgia';ctx.fillText('Consulting · Speaking · Partnerships',65,h-75);return;}
 if(id==='press'){ctx.fillStyle='#243d31';ctx.font='21px Georgia';ctx.fillText('DONTE MILLER',55,74);ctx.font='100px Georgia';ctx.fillText('The Village',50,200);ctx.font='22px Georgia';ctx.fillText('STORIES & CONVERSATIONS',55,250);photoFill(ctx,35,305,w-70,h-470);ctx.font='24px Georgia';ctx.fillText('SELECTED PRESS',55,h-80);ctx.font='17px Georgia';ctx.fillText('VOL. 01                                      ATLANTA & BEYOND',55,h-43);}
 else{photoFill(ctx,0,0,w,h*.66);const g=ctx.createLinearGradient(0,h*.43,0,h*.7);g.addColorStop(0,'#233d2d00');g.addColorStop(1,'#233d2d');ctx.fillStyle=g;ctx.fillRect(0,h*.43,w,h*.3);ctx.fillStyle='#f5ecd5';ctx.font='20px Georgia';ctx.fillText('VILLAGE MICRO FUND',55,h*.72);ctx.font='66px Georgia';ctx.fillText('Ten Years of',50,h*.81);ctx.fillText('Building Together',50,h*.88);ctx.font='20px Georgia';ctx.fillText('2015—2025                   THE TEN-YEAR REPORT',55,h*.95);}
 },768,1080);}
function innerTexture(id){return texture((ctx,w,h)=>{ctx.fillStyle='#f7f0df';ctx.fillRect(0,0,w,h);ctx.fillStyle='#2e4536';ctx.font='17px Georgia';ctx.fillText('DONTE MILLER / THE DINING TABLE',50,65);ctx.fillRect(50,90,w-100,2);ctx.font='67px Georgia';const words=id==='press'?['The Village,','in the world.']:id==='report'?['Ten years.','One Village.']:['Let’s build','something.'];words.forEach((s,i)=>ctx.fillText(s,50,200+i*80));for(let y=450;y<h-100;y+=34){ctx.fillStyle='#53614c33';ctx.fillRect(50,y,w-100-(y%5)*25,2);}},768,1080);}
function roundedShape(w,h,r){const s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s;}
function mesh(geometry,material,parent=scene){const m=new THREE.Mesh(geometry,material);parent.add(m);m.castShadow=true;m.receiveShadow=true;return m;}
function makeBook(id,x,z,angle){const group=new THREE.Group();scene.add(group);const w=id==='opportunities'?1.18:1.36,h=id==='opportunities'?1.65:1.89;group.position.set(x,.86,z);group.rotation.set(-Math.PI/2,0,angle);const thickness=id==='report'?.11:.065;
 const paperMat=new THREE.MeshStandardMaterial({color:'#e6dac1',roughness:.95});const pageBlock=mesh(new THREE.BoxGeometry(w,h,thickness),paperMat,group);
 const lines=texture((ctx,W,H)=>{ctx.fillStyle='#e6dac1';ctx.fillRect(0,0,W,H);for(let y=0;y<H;y+=9){ctx.fillStyle='#bfb199';ctx.fillRect(0,y,W,1);}},128,128);pageBlock.material=[paperMat,paperMat,new THREE.MeshStandardMaterial({map:lines}),paperMat,paperMat,paperMat];
 const inner=mesh(new THREE.PlaneGeometry(w-.035,h-.025),new THREE.MeshBasicMaterial({map:innerTexture(id)}),group);inner.position.z=thickness/2+.003;inner.castShadow=false;
 const hinge=new THREE.Group();hinge.position.set(-w/2,0,thickness/2+.014);group.add(hinge);const coverMaterials=[new THREE.MeshStandardMaterial({color:id==='report'?'#203c2a':'#e5dbc4'}),paperMat,paperMat,paperMat,new THREE.MeshBasicMaterial({map:coverTexture(id)}),new THREE.MeshStandardMaterial({color:'#f0e6ce',roughness:1})];const cover=mesh(new THREE.BoxGeometry(w,h,.022),coverMaterials,hinge);cover.position.x=w/2;
 if(id==='opportunities'){for(let i=0;i<14;i++){const coil=mesh(new THREE.TorusGeometry(.048,.011,4,10),new THREE.MeshStandardMaterial({color:'#3c4037',metalness:.7,roughness:.4}),group);coil.position.set(-w/2+.07+i*(w-.14)/13,h/2-.035,thickness/2+.025);coil.rotation.x=Math.PI/2;}// The pen belongs to the table, not to the animated notepad rig.
 const penRig=new THREE.Group();penRig.name='Pen beside notepad — stays on table';scene.add(penRig);penRig.position.set(x+w/2+.3,.805,z);penRig.rotation.y=-.3;
 const pen=mesh(new THREE.CylinderGeometry(.025,.025,1.12,10),new THREE.MeshStandardMaterial({color:'#293b2d',roughness:.4}),penRig);pen.rotation.x=Math.PI/2;
 const clip=mesh(new THREE.BoxGeometry(.016,.018,.25),new THREE.MeshStandardMaterial({color:'#bb9c57',metalness:.7,roughness:.4}),penRig);clip.position.set(.018,.026,-.32);}

 group.userData.bookId=id;group.traverse(c=>{if(c.isMesh){c.userData.bookId=id;pickables.push(c);}});books.set(id,{group,hinge,w,h,home:{position:group.position.clone(),rotation:group.rotation.clone()}});}
function makeChair(x,z,rot){const group=new THREE.Group();group.position.set(x,0,z);group.rotation.y=rot;scene.add(group);const wood=new THREE.MeshStandardMaterial({color:'#684329',roughness:.85}),fabric=new THREE.MeshStandardMaterial({color:'#a95e36',roughness:1});const seat=mesh(new THREE.CylinderGeometry(.51,.5,.16,32),fabric,group);seat.scale.z=.85;seat.position.y=.39;for(const a of [-1,1])for(const b of [-1,1]){const leg=mesh(new THREE.BoxGeometry(.08,.44,.08),wood,group);leg.position.set(a*.32,.15,b*.27);}const back=mesh(new THREE.BoxGeometry(1.02,.08,.1),wood,group);back.position.set(0,1,-.38);for(const a of [-1,1]){const post=mesh(new THREE.BoxGeometry(.07,.85,.07),wood,group);post.position.set(a*.46,.61,-.38);}}
function buildScene(){scene=new THREE.Scene();scene.background=new THREE.Color('#e3d5bd');scene.fog=new THREE.Fog('#dfd0b7',50,95);camera=new THREE.PerspectiveCamera(40,viewport().width/viewport().height,.1,80);camera.position.set(0,9.8,6.8);camera.lookAt(target);
 const hemi=new THREE.HemisphereLight('#fff9e9','#846d4a',2.5);scene.add(hemi);const key=new THREE.DirectionalLight('#fff4d3',3);key.position.set(-5,10,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-29,right:15,top:16,bottom:-16,near:.5,far:65});key.shadow.bias=-.0004;key.shadow.normalBias=.025;key.shadow.radius=4;scene.add(key);const fill=new THREE.DirectionalLight('#c4d8ee',1.2);fill.position.set(6,4,-3);scene.add(fill);
 const floor=mesh(new THREE.PlaneGeometry(80,80),new THREE.MeshStandardMaterial({color:'#dfcfb1',roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-.5;floor.castShadow=false;
 const rug=mesh(new THREE.PlaneGeometry(11.5,8.5),new THREE.MeshStandardMaterial({map:rugTexture(),roughness:1}));rug.rotation.x=-Math.PI/2;rug.position.y=-.47;rug.castShadow=false;
 const shape=roundedShape(8.1,4.35,1.65);const geometry=new THREE.ExtrudeGeometry(shape,{depth:.19,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.055,bevelThickness:.035,curveSegments:32});const pos=geometry.attributes.position,uv=geometry.attributes.uv;for(let i=0;i<pos.count;i++)uv.setXY(i,(pos.getX(i)+4.1)/8.2,(pos.getY(i)+2.2)/4.4);const table=mesh(geometry,new THREE.MeshStandardMaterial({map:grainTexture(),roughness:.83}));table.rotation.x=-Math.PI/2;table.position.y=.53;
 const legMat=new THREE.MeshStandardMaterial({color:'#29483e',roughness:.9});for(const x of [-1.9,1.9]){const leg=mesh(new THREE.CylinderGeometry(.48,.55,1,32),legMat);leg.position.set(x,.03,0);}
 makeChair(-4.8,0,Math.PI/2);makeChair(4.8,0,-Math.PI/2);for(const x of [-1.5,1.5])makeChair(x,3.4,0);for(const x of [-1.5,1.5])makeChair(x,-3.4,Math.PI);
 makeBook('press',-1.75,.05,-.13);makeBook('report',0,-.03,.07);makeBook('opportunities',1.72,.13,-.08);
 house=buildHouse(scene,{portrait:portraitImage,rugMap:rugTexture()});library=buildLibrary(scene);
 travelCamera();
 function pick(e){updatePointer(e);raycaster.setFromCamera(pointer,camera);return raycaster.intersectObjects(state.libraryProgress>.94?library.pickables:state.houseProgress<.25?house.pickables:state.houseProgress>.94?pickables:[],false)[0]?.object;}
 renderer.domElement.addEventListener('pointermove',e=>{if(state.mode!=='exploring')return;const hit=pick(e),id=hit?.userData.bookId||hit?.userData.livingId||hit?.userData.courseId||null;if(id===hovered)return;hovered=id;renderer.domElement.style.cursor=id?'pointer':'default';books.forEach((b,key)=>gsap.to(b.group.position,{y:b.home.position.y+(key===id ? .1 : 0),duration:.25,onUpdate:invalidateShadows}));library.books.forEach((b,key)=>gsap.to(b.group.position,{z:b.home.position.z+(key===id ? .12 : 0),duration:.25,onUpdate:invalidateShadows}));});
 renderer.domElement.addEventListener('pointerleave',()=>{if(state.mode==='exploring'){hovered=null;books.forEach(b=>gsap.to(b.group.position,{y:b.home.position.y,duration:.25,onUpdate:invalidateShadows}));library.books.forEach(b=>gsap.to(b.group.position,{z:b.home.position.z,duration:.25,onUpdate:invalidateShadows}));}});
 renderer.domElement.addEventListener('click',e=>{if(state.mode!=='exploring')return;const hit=pick(e);if(hit?.userData.courseId)openCourse(hit.userData.courseId);else if(hit?.userData.bookId)openBook(hit.userData.bookId);else if(hit?.userData.livingId)openLiving(hit.userData.livingId);});
}
function positionHotspots(){
 books.forEach((b,id)=>{const v=new THREE.Vector3(b.home.position.x,.87,b.home.position.z+b.h*.68);v.project(camera);const button=hotspots.find(el=>el.dataset.open===id);const r=viewport();button.style.left=`${r.left+(v.x*.5+.5)*r.width}px`;button.style.top=`${r.top+(-v.y*.5+.5)*r.height}px`;});
 if(!house)return;
 const r=viewport();
 for(const button of livingControls){const id=button.dataset.living,a=house.anchors.get(id),v=a.clone().project(camera);button.hidden=state.houseProgress>.24||v.z>1||v.z< -1;if(button.hidden)continue;button.style.left=`${r.left+(v.x*.5+.5)*r.width}px`;button.style.top=`${r.top+(-v.y*.5+.5)*r.height}px`;if(id!=='about'){const upper=a.clone().add(new THREE.Vector3(.9,.66,0)).project(camera),lower=a.clone().add(new THREE.Vector3(-.9,-.66,0)).project(camera);button.style.width=`${Math.max(42,Math.abs(upper.x-lower.x)*r.width/2)}px`;button.style.height=`${Math.max(42,Math.abs(upper.y-lower.y)*r.height/2)}px`;}}
}
let previousFrame=0;
function frame(now=performance.now()){
 requestAnimationFrame(frame);const dt=previousFrame?(now-previousFrame)/1000:1/60;previousFrame=now;
 if(state.mode==='exploring'&&!state.reduce&&!state.journeyNavigation&&(state.houseProgress!==state.houseTarget||Math.abs(state.journeyVelocity)>.0001)){
  const next=followProgress(state.houseProgress,state.houseTarget,state.journeyVelocity,dt);state.houseProgress=next.position;state.journeyVelocity=next.velocity;travelCamera();
 }
 if(state.mode==='exploring'&&!state.reduce&&!state.journeyNavigation&&(state.libraryProgress!==state.libraryTarget||Math.abs(state.libraryVelocity)>.0001)){
  const next=followProgress(state.libraryProgress,state.libraryTarget,state.libraryVelocity,dt);state.libraryProgress=next.position;state.libraryVelocity=next.velocity;travelCamera();
 }
 if(state.mode==='exploring'&&performance.now()>=state.autoCooldown&&libraryBookReady(state.libraryTarget,state.libraryProgress,state.libraryScrollAmount)){state.courseCarry=Math.min(240,Math.max(0,state.libraryScrollAmount-160));state.libraryScrollAmount=0;openCourse(state.courseScrollTarget);}
 if(!dirty||!renderer||!scene||!camera)return;dirty=false;if(state.mode==='exploring')positionHotspots();renderer.render(scene,camera);
}
window.addEventListener('resize',()=>{if(!camera||!renderer)return;camera.aspect=viewport().width/viewport().height;camera.updateProjectionMatrix();renderer.setSize(viewport().width,viewport().height);if(state.mode==='exploring')travelCamera();invalidate();if(state.mode==='reading')updateProgress();});
async function start(){
 try{
  if(!gsap)throw new Error('Animation library did not load');
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(viewport().width,viewport().height);renderer.shadowMap.enabled=true;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;renderer.shadowMap.type=THREE.PCFShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;$('scene').append(renderer.domElement);
  const loadImage=src=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src;});
  [photo,portraitImage]=await Promise.all([loadImage('/assets/akua-ribbon.jpg'),loadImage('/assets/living-room-reference.jpg')]);
  const direct=location.hash.slice(1);
  state.houseProgress=state.houseTarget=BOOKS.includes(direct)||direct==='table'||direct==='dining'||direct==='library'||direct.startsWith('course-')?1:0;
  state.libraryProgress=state.libraryTarget=direct==='library'||direct.startsWith('course-')?1:0;
  if(state.libraryTarget)state.scrollTarget='library';
  state.aboutOffset=state.houseTarget===1?ABOUT_DISTANCE:direct==='about'?ABOUT_CHAPTER_DISTANCE*1.25:0;
  buildScene();setMode('exploring');travelCamera();frame();
  if(direct==='library')document.title='Donte Miller — The Library';
  else if(direct==='table'||direct==='dining')document.title='Donte Miller — The Dining Table';
  gsap.to($('loading'),{autoAlpha:0,duration:.6,onComplete:()=>{$('loading').hidden=true;}});
  if(BOOKS.includes(direct))openBook(direct,{historyChange:false});else if(direct.startsWith('course-')&&curriculumById[direct.slice(7)])openCourse(direct.slice(7),{historyChange:false});else if(livingItems[direct]&&direct!=='about')openLiving(direct,{historyChange:false});
 }catch(error){console.error('Scene initialization:',error);$('loading').hidden=true;$('scene-error').hidden=false;setMode('exploring');document.body.classList.add('simple-mode');state.houseProgress=state.houseTarget=1;document.documentElement.dataset.room='table';announce('The reading menu is available while the scene is unavailable.');const direct=location.hash.slice(1);if(BOOKS.includes(direct))openBook(direct,{historyChange:false});}
}
start();
