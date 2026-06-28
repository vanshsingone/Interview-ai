import React, { useState } from 'react'
import "../style/interview.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const QuestionCard = ({ index, q }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="q-card">
            <div className="q-card__header" onClick={() => setIsOpen(!isOpen)}>
                <span className="q-card__index">Q{index}</span>
                <h3 className="q-card__question">{q.question}</h3>
                <span className={`q-card__chevron ${isOpen ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
            </div>
            {isOpen && (
                <div className="q-card__body">
                    <div className="q-card__section">
                        <span className="q-card__tag q-card__tag--intention">Intention</span>
                        <p>{q.intention}</p>
                    </div>
                    <div className="q-card__section">
                        <span className="q-card__tag q-card__tag--answer">Suggested Answer</span>
                        <p>{q.answer}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const Interview = () => {
    const { loading, report, getResumePdf } = useInterview()
    const [activeTab, setActiveTab] = useState("technical")
    const navigate = useNavigate()

    if (loading) {
        return (
            <main className='loading-screen'>
                <div className='loader-spinner'>
                    <div className='loader-ring'></div>
                    <div className='loader-ring'></div>
                    <div className='loader-ring'></div>
                    <div className='loader-core'></div>
                </div>
                <h1>Loading your interview plan...</h1>
                <p>Our AI is analyzing the requirements and tailoring a custom preparation strategy for you.</p>
            </main>
        )
    }

    if (!report) {
        return (
            <main className='loading-screen'>
                <h1>No interview plan found.</h1>
                <button onClick={() => navigate('/')} className="generate-btn" style={{ marginTop: '1rem' }}>
                    Go Back Home
                </button>
            </main>
        )
    }

    return (
        <div className='interview-page'>
            <div className='interview-layout'>
                
                {/* Left Sidebar - Navigation */}
                <nav className='interview-nav'>
                    <div>
                        <div className='interview-nav__label'>Interview Guide</div>
                        <button 
                            className={`interview-nav__item ${activeTab === 'technical' ? 'interview-nav__item--active' : ''}`}
                            onClick={() => setActiveTab('technical')}
                        >
                            <span className='interview-nav__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                            </span>
                            Technical Q&A
                        </button>
                        <button 
                            className={`interview-nav__item ${activeTab === 'behavioral' ? 'interview-nav__item--active' : ''}`}
                            onClick={() => setActiveTab('behavioral')}
                        >
                            <span className='interview-nav__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </span>
                            Behavioral Q&A
                        </button>
                        <button 
                            className={`interview-nav__item ${activeTab === 'roadmap' ? 'interview-nav__item--active' : ''}`}
                            onClick={() => setActiveTab('roadmap')}
                        >
                            <span className='interview-nav__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            </span>
                            Preparation Plan
                        </button>
                    </div>

                    <div>
                        <button className='interview-nav__item' onClick={() => getResumePdf(report._id)}>
                            <span className='interview-nav__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            </span>
                            Download PDF
                        </button>
                        <button className='interview-nav__item' onClick={() => navigate('/')}>
                            <span className='interview-nav__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            </span>
                            Go Back Home
                        </button>
                    </div>
                </nav>

                <div className='interview-divider' />

                {/* Center Panel - Content */}
                <main className='interview-content'>
                    {activeTab === 'technical' && (
                        <section>
                            <div className="content-header">
                                <h2>Technical Questions</h2>
                                <span className="content-header__count">{report.technicalQuestions?.length || 0}</span>
                            </div>
                            <div className="q-list">
                                {report.technicalQuestions?.map((q, idx) => (
                                    <QuestionCard key={idx} index={idx + 1} q={q} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === 'behavioral' && (
                        <section>
                            <div className="content-header">
                                <h2>Behavioral Questions</h2>
                                <span className="content-header__count">{report.behavioralQuestions?.length || 0}</span>
                            </div>
                            <div className="q-list">
                                {report.behavioralQuestions?.map((q, idx) => (
                                    <QuestionCard key={idx} index={idx + 1} q={q} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === 'roadmap' && (
                        <section>
                            <div className="content-header">
                                <h2>Preparation Plan</h2>
                            </div>
                            <div className="roadmap-list">
                                {report.preparationPlan?.map((day, idx) => (
                                    <div key={idx} className="roadmap-day">
                                        <div className="roadmap-day__header">
                                            <span className="roadmap-day__badge">Day {day.day}</span>
                                            <h3 className="roadmap-day__focus">{day.focus}</h3>
                                        </div>
                                        <ul className="roadmap-day__tasks">
                                            {day.tasks?.map((task, tIdx) => (
                                                <li key={tIdx}>
                                                    <span className="roadmap-day__bullet" />
                                                    {task}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='interview-divider' />

                {/* Right Sidebar - Match Score & Skill Gaps */}
                <aside className='interview-sidebar'>
                    <div className='match-score'>
                        <h4 className='match-score__label'>Match Score</h4>
                        <div className={`match-score__ring ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                            <span className='match-score__value'>{report.matchScore}</span>
                            <span className='match-score__pct'>%</span>
                        </div>
                        <p className='match-score__sub'>
                            {report.matchScore >= 80 ? 'Excellent Match' : report.matchScore >= 60 ? 'Good Match' : 'Potential Gaps'}
                        </p>
                    </div>

                    <div className='sidebar-divider' />

                    <div className='skill-gaps'>
                        <h4 className='skill-gaps__label'>Skill Gaps</h4>
                        <div className='skill-gaps__list'>
                            {report.skillGaps?.map((gap, idx) => (
                                <span key={idx} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                            {(!report.skillGaps || report.skillGaps.length === 0) && (
                                <p style={{ fontSize: '0.8rem', color: '#7d8590' }}>No major skill gaps identified!</p>
                            )}
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    )
}

export default Interview