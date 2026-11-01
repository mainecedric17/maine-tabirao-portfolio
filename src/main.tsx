import React, {useEffect,useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowUpRight, ArrowRight, Github, Linkedin, Mail, Menu, X, Check, ExternalLink, GitBranch, ShieldCheck, CalendarDays, FileText, Layers3} from 'lucide-react';import {profile,projects,skills,milestones,type Focus,type Project} from './data';
import './styles.css';
function App(){
 const [focus,setFocus]=useState<'all'|Focus>('all'); const [selected,setSelected]=useState<Project|null>(null); const [nav,setNav]=useState(false); const [tech,setTech]=useState('n8n'); const [node, setNode] = useState(0);
  const [activeProject, setActiveProject] = useState<'brightsmile' | 'freshnest' | 'students'>('brightsmile');
 useEffect(()=>{if(!selected)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setSelected(null)};window.addEventListener('keydown',onKey);return ()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',onKey)}},[selected]);
 const filtered=useMemo(()=>focus==='all'?projects:projects.filter(p=>p.category===focus || (p.id==='freshnest' && focus==='automation')),[focus]);
 const techProjects=projects.filter(p=>p.stack.some(s=>s.toLowerCase()===tech.toLowerCase()));
 const allTech=Array.from(new Set(projects.flatMap(p=>p.stack)));
 const previews:Record<string,string>={brightsmile:'/assets/brightsmile-website.webp',students:'/assets/student-app.webp',freshnest:'/assets/freshnest-home.webp'};
 const gallery:Record<string,{src:string;label:string}[]>={brightsmile:[{src:'/assets/brightsmile-website.webp',label:'BrightSmile website and dental services'},{src:'/assets/brightsmile-main.webp',label:'AI agent and calendar tools'},{src:'/assets/brightsmile-cancellation.webp',label:'Cancellation authorization workflow'},{src:'/assets/brightsmile-otp.webp',label:'OTP generation workflow'},{src:'/assets/brightsmile-test.webp',label:'OTP validation test'}],students:[{src:'/assets/student-app.webp',label:'Power Apps student management UI (details obscured)'},{src:'/assets/student-flow.webp',label:'Power Automate workflow overview'},{src:'/assets/student-data.webp',label:'Excel tracking (personal details obscured)'}],freshnest:[{src:'/assets/freshnest-home.webp',label:'FreshNest homepage'},{src:'/assets/freshnest-estimator.webp',label:'Interactive cost estimator'},{src:'/assets/freshnest-crm.webp',label:'GoHighLevel form workflow'}]};
  const walkthroughs = {
    brightsmile: {
      title: 'BrightSmile Dental Clinic',
      subtitle: 'AI-assisted appointment scheduling and verification',
      image: '/assets/brightsmile-website.webp',
      imageAlt: 'BrightSmile n8n AI agent and calendar workflow',
      steps: [
        { label: 'Patient request', desc: 'The Gemini-powered AI receptionist answers patient inquiries and helps collect appointment details.' },
        { label: 'Availability', desc: 'The local n8n workflow checks available appointment slots through Google Calendar.' },
        { label: 'Booking', desc: 'The assistant creates calendar appointments through the connected workflow.' },
        { label: 'Verification', desc: 'Appointment cancellation uses an email OTP verification flow through Gmail.' },
      ],
      note: 'Core AI booking and OTP cancellation work locally. The public website is a portfolio preview, not a live hosted AI service. Dentist follow-ups, pricing, and staff handoff remain planned.',
    },
    freshnest: {
      title: 'FreshNest Cleaning Services',
      subtitle: 'Website, pricing estimator, and lead-to-CRM workflow',
      image: '/assets/freshnest-estimator.webp',
      imageAlt: 'FreshNest interactive price estimator',
      steps: [
        { label: 'Visit website', desc: 'Customers explore services on the responsive FreshNest website.' },
        { label: 'Estimate cost', desc: 'The interactive estimator provides an indicative cleaning quote.' },
        { label: 'Submit inquiry', desc: 'GoHighLevel forms capture lead details for CRM processing.' },
        { label: 'Track lead', desc: 'Lead tagging, pipeline stages, and workflow automation help organize follow-up.' },
      ],
      note: 'Personal project. The website and CRM workflow are working; email notifications were not verified due to trial limitations.',
    },
    students: {
      title: 'Student Information System',
      subtitle: 'Microsoft Forms to automated PDF and email delivery',
      image: '/assets/student-flow.webp',
      imageAlt: 'Power Automate student PDF generation workflow',
      steps: [
        { label: 'Collect data', desc: 'Microsoft Forms submissions are recorded in an Excel Online table.' },
        { label: 'Review records', desc: 'Power Apps provides a student review and editing interface.' },
        { label: 'Generate PDFs', desc: 'Power Automate generates student PDF documents from structured records.' },
        { label: 'Email and update', desc: 'The flow emails PDFs and updates the Excel Status and DateSent fields; end-to-end testing succeeded.' },
      ],
      note: 'Completed project. Student-identifying details in public screenshots are obscured.',
    },
  };
  const activeFlow = walkthroughs[activeProject];

 return <>
 <a className="skip" href="#main">Skip to content</a>
 <header className="site-header"><div className="container nav"><a className="brand" href="#home" aria-label="Maine Tabirao home">Maine Tabirao<span>.</span></a><nav className={nav?'links open':'links'} aria-label="Main navigation"><a onClick={()=>setNav(false)} href="#work">Work</a><a onClick={()=>setNav(false)} href="#skills">Skills</a><a onClick={()=>setNav(false)} href="#about">About</a><a onClick={()=>setNav(false)} href="#contact">Contact</a><a className="nav-resume" onClick={()=>setNav(false)} href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a><a className="nav-resume" onClick={()=>setNav(false)} href={profile.resume} download>Resume <FileText size={14}/></a></nav><button className="menu" onClick={()=>setNav(!nav)} aria-label={nav?'Close navigation':'Open navigation'} aria-expanded={nav}>{nav?<X/>:<Menu/>}</button></div></header>
 <main id="main"><section className="hero container" id="home"><div className="eyebrow"><span className="pulse"/> WEB DEVELOPMENT <span className="separator">/</span> AUTOMATION</div><h1>Building web applications.<br/><span>Automating what matters.</span></h1><p className="hero-copy">I'm Maine, a developer building practical web applications and automated workflows that simplify everyday processes.</p><div className="actions"><a className="btn primary" href="#work">View projects <ArrowRight size={17}/></a><a className="btn secondary" href="#contact">Get in touch <ArrowUpRight size={17}/></a></div><div className="hero-specialties"><span>Web Applications</span><span>API Integrations</span><span>Workflow Automation</span></div><div className="hero-bottom"><span>Based in the Philippines</span><span>Scroll to explore <span aria-hidden="true">↓</span></span></div></section>
 <section className="section work-section" id="work"><div className="container"><div className="section-heading"><div><p className="kicker">01 / SELECTED WORK</p><h2>Projects with purpose<span className="dot">.</span></h2><p className="subhead">A look at the systems I've built, tested, and continue to improve.</p></div><div className="filter" aria-label="Filter projects">{(['all','web','automation'] as const).map(f=><button key={f} className={focus===f?'active':''} onClick={()=>setFocus(f)} aria-pressed={focus===f}>{f==='all'?'All work':f==='web'?'Web development':'Automation'}</button>)}</div></div><div className="project-grid">{filtered.map((p,i)=><article className="project" key={p.id}><div className={`project-art art-${p.id}`}><div className="art-top"><span>PROJECT / {String(i+1).padStart(2,'0')}</span><span>{p.year}</span></div><div className="art-center preview-wrap"><img src={previews[p.id]} alt={`${p.title} actual project screenshot`} loading="lazy"/></div><div className="art-bottom"><span>{p.stack.slice(0,3).join('  ·  ')}</span><ArrowUpRight size={19}/></div></div><div className="project-info"><div className="project-topline"><span className="status"><span className={`status-dot ${p.status==='In development'?'inprogress':''}`}/>{p.status}</span><span>{p.category==='web'?'WEB DEVELOPMENT':'AUTOMATION'}</span></div><h3>{p.title}</h3><p>{p.summary}</p><div className="tags">{p.stack.slice(0,4).map(t=><span key={t}>{t}</span>)}</div><button className="text-link" onClick={()=>setSelected(p)}>Explore case study <ArrowUpRight size={16}/></button></div></article>)}</div></div></section>
 <section className="section skills-section" id="skills"><div className="container"><p className="kicker">02 / CAPABILITIES</p><h2>Tools are useful.<br/><span>What you build matters.</span></h2><div className="skills-layout"><div className="skill-groups">{skills.map(s=><div className="skill-group" key={s.group}><h3>{s.group}</h3><div className="tags">{s.items.map(t=><span key={t}>{t}</span>)}</div></div>)}</div><div className="tech-explorer"><div className="tech-header"><Layers3 size={19}/><strong>Explore the stack</strong></div><p>Select a technology to see where it appears in my work.</p><div className="tech-buttons">{allTech.map(t=><button key={t} onClick={()=>setTech(t)} aria-pressed={tech===t} className={tech===t?'chosen':''}>{t}</button>)}</div><div className="tech-result"><span>RELATED PROJECTS / {tech}</span>{techProjects.length?techProjects.map(p=><button key={p.id} onClick={()=>setSelected(p)}>{p.title}<ArrowUpRight size={15}/></button>):<p>Project evidence to be added.</p>}</div></div></div></div></section>
        {/* INTERACTIVE THREE-PROJECT WALKTHROUGH */}
        <section className="section proof-section" id="engineering">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="kicker">03 / PROJECT ENGINEERING</p>
                <h2>Inside My Projects<span className="dot">.</span></h2>
                <p className="subhead">Explore the real interfaces, integrations, and workflows behind all three featured projects.</p>
              </div>
            </div>

            <div className="project-tabs" role="group" aria-label="Choose a project walkthrough">
              {([
                ['brightsmile', 'BrightSmile'],
                ['freshnest', 'FreshNest'],
                ['students', 'Student PDF System'],
              ] as const).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={activeProject === id ? 'project-tab active' : 'project-tab'}
                  aria-pressed={activeProject === id}
                  onClick={() => { setActiveProject(id); setNode(0); }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="walkthrough-panel">
              <div className="walkthrough-intro">
                <div>
                  <p className="kicker">PROJECT WALKTHROUGH</p>
                  <h3>{activeFlow.title}</h3>
                  <p>{activeFlow.subtitle}</p>
                </div>
                <button className="text-link" type="button" onClick={() => setSelected(projects.find(p => p.id === activeProject) ?? null)}>
                  Explore full case study <ArrowUpRight size={16} />
                </button>
              </div>
              <img className="walkthrough-image" src={activeFlow.image} alt={activeFlow.imageAlt} loading="lazy" />
              <div className="flow-grid">
                {activeFlow.steps.map((step, i) => (
                  <button
                    key={step.label}
                    type="button"
                    className={node === i ? 'flow-node selected' : 'flow-node'}
                    onClick={() => setNode(i)}
                    aria-pressed={node === i}
                  >
                    <span>0{i + 1}</span>
                    <strong>{step.label}</strong>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
              <div className="flow-detail" aria-live="polite">
                <span>STEP {String(node + 1).padStart(2, '0')}</span>
                <p>{activeFlow.steps[node].desc}</p>
              </div>
              <p className="walkthrough-note"><ShieldCheck size={17} />{activeFlow.note}</p>
            </div>

            <div className="journal">
              <div>
                <p className="kicker">BRIGHTSMILE BUILD JOURNAL</p>
                <h3>Progress, not promises.</h3>
                <p>Development milestones are shown separately from features planned for future work.</p>
              </div>
              <div className="milestones">
                {milestones.map(m => (
                  <div className="milestone" key={m.title}>
                    <span>{m.date}</span>
                    <div><strong>{m.title}</strong><p>{m.detail}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

 <section className="section about-section" id="about"><div className="container about-grid"><div><p className="kicker">04 / ABOUT</p><h2>Curious by nature.<br/><span>Practical by design.</span></h2></div><div className='about-text'><p>I'm an Information Technology graduate from National University Fairview, interested in building software and connecting tools into useful systems.</p><p>My background includes hands-on IT support internship experience, web development projects, and independent work with workflow automation platforms. I enjoy understanding how a process works before figuring out how technology can improve it.</p><div className="about-links"><a href={profile.resume} download><FileText size={17}/> Download CV <ArrowUpRight size={15}/></a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={15}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={15}/></a></div></div><figure className="portrait"><img src="/assets/portrait.webp" alt="Maine Tabirao in graduation attire" loading="lazy"/><figcaption>BS Information Technology · National University Fairview · 2026</figcaption></figure></div></section>
 <section className="section contact-section" id="contact"><div className="container contact"><p className="kicker">05 / GET IN TOUCH</p><p className="availability"><span className="availability-dot"/> Open to opportunities</p><h2>Let's build something<br/><span>together.</span></h2><p>I'm open to junior web development, full-stack, and automation opportunities. Feel free to reach out about a role, project, or collaboration.</p><a className="btn primary" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`} target="_blank" rel="noopener noreferrer">Send an email <Mail size={17}/></a><a className="btn secondary contact-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a><a className="email" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`} target="_blank" rel="noopener noreferrer">{profile.email}</a></div></section></main>
 <footer><div className="container footer"><a className="brand" href="#home">Maine Tabirao<span>.</span></a><span>Designed & built with care · 2026</span><div><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19}/></a><a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`} target="_blank" rel="noopener noreferrer" aria-label="Email"><Mail size={19}/></a></div></div></footer>
 {selected&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="case-title"><div className="modal-header"><span className="kicker">PROJECT CASE STUDY</span><button onClick={()=>setSelected(null)} aria-label="Close case study"><X/></button></div><div className="modal-content"><span className="status">{selected.status} · {selected.year}</span><h2 id="case-title">{selected.title}</h2><p className="lead">{selected.summary}</p><div className="tags">{selected.stack.map(s=><span key={s}>{s}</span>)}</div><div className="case-gallery">{gallery[selected.id].map(item=><figure key={item.src}><img src={item.src} alt={item.label} loading="lazy"/><figcaption>{item.label}</figcaption></figure>)}</div><h3><Check size={18}/> Implemented / explored</h3><ul>{selected.highlights.map(h=><li key={h}>{h}</li>)}</ul><h3><GitBranch size={18}/> Engineering notes</h3><ul>{selected.decisions.map(d=><li key={d}>{d}</li>)}</ul>{selected.next&&<><h3><CalendarDays size={18}/> Planned next</h3><ul>{selected.next.map(n=><li key={n}>{n}</li>)}</ul></>}{selected.proof?.length?<div className="proof-links">{selected.proof.map(link=><a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} <ExternalLink size={15}/></a>)}</div>:<div className="proof-note"><ShieldCheck size={17}/> No public demo or repository is provided for this project. Screenshots above show development work.</div>}</div></section></div>}
 </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
