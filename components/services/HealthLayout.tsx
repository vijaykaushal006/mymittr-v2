'use client';

import { useState, useEffect, useRef } from 'react';
import { healthTopics } from '@/lib/health-content';
import Link from 'next/link';

// Simple utility for classes if not available
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

export default function HealthLayout() {
    const [activeTopicId, setActiveTopicId] = useState<string>(healthTopics[0].id);

    // Find active topic safely
    const activeTopic = healthTopics.find(t => t.id === activeTopicId) || healthTopics[0];

    const contentRef = useRef<HTMLElement>(null);

    // Smart scroll handling: Scroll to top of content, not page
    useEffect(() => {
        if (!contentRef.current) return;

        // Calculate position of the content area relative to the document
        const rect = contentRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const headerOffset = 140; // Approx height of sticky header + sidebar offset
        const targetPosition = rect.top + scrollTop - headerOffset;

        // If user has scrolled PAST the start of the content, gently scroll back to start
        // This preserves the hero section if they are at the top, but resets reading if deep in article
        if (scrollTop > targetPosition) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }, [activeTopicId]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* LEFT SIDEBAR - Navigation */}
            <aside className="lg:w-1/3 lg:flex-shrink-0">
                <div className="lg:sticky lg:top-28 space-y-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 px-2 flex items-center gap-2">
                            <span className="text-2xl">📚</span>
                            Health Topics
                        </h2>

                        <nav className="space-y-2">
                            {healthTopics.map((topic) => (
                                <button
                                    key={topic.id}
                                    onClick={() => setActiveTopicId(topic.id)}
                                    className={cn(
                                        "w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center gap-4 group border-2",
                                        activeTopicId === topic.id
                                            ? "bg-[#f4f9f7] border-[#1e4d45] text-[#1e4d45] shadow-sm transform scale-[1.02]"
                                            : "bg-white border-transparent hover:bg-gray-50 text-gray-700 hover:text-[#1e4d45] hover:border-gray-100"
                                    )}
                                    aria-current={activeTopicId === topic.id ? 'page' : undefined}
                                >
                                    <span className="text-2xl flex-shrink-0" aria-hidden="true">{topic.icon}</span>
                                    <span className={cn(
                                        "font-medium text-lg",
                                        activeTopicId === topic.id ? "font-bold" : "font-medium"
                                    )}>
                                        {topic.title}
                                    </span>

                                    {/* Chevron for active state clarity */}
                                    {activeTopicId === topic.id && (
                                        <span className="ml-auto text-[#1e4d45] font-bold text-xl">→</span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Calm Reassurance Box - Visible only on Desktop */}
                    <div className="hidden lg:block p-6 bg-gradient-to-br from-[#1e4d45] to-[#153a33] rounded-2xl text-white shadow-lg">
                        <p className="text-lg font-medium leading-relaxed italic opacity-90 mb-4">
                            "The greatest wealth is health. Take time today to nurture your body and mind."
                        </p>
                        <div className="flex items-center gap-2 opacity-75 text-sm">
                            <span className="w-8 h-0.5 bg-white/50"></span>
                            <span>Daily Wisdom</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA - Reading Experience */}
            <main ref={contentRef} id="main-content" className="lg:w-2/3 min-h-[600px]">
                <article
                    key={activeTopicId}
                    className="bg-white rounded-[2rem] p-6 sm:p-10 lg:p-12 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500"
                >

                    {/* Header */}
                    <header className="mb-10 pb-8 border-b-2 border-gray-100">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="w-16 h-16 bg-[#f4f9f7] rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-[#e6f0ed]">
                                {activeTopic.icon}
                            </span>
                            <span className="px-4 py-1.5 bg-[#e6f0ed] text-[#1e4d45] text-sm font-bold uppercase tracking-wider rounded-full">
                                Health Guide
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
                            {activeTopic.title}
                        </h1>

                        <div className="flex items-center gap-3 text-gray-500 text-base font-medium">
                            <span>Reading time: ~5 mins</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>Expert curated</span>
                        </div>
                    </header>

                    {/* Content - Typography Focused for Seniors */}
                    <div
                        className="prose prose-lg md:prose-xl max-w-none text-gray-800
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-6 prose-headings:mt-10
              prose-p:leading-relaxed prose-p:mb-6 prose-p:text-xl prose-p:text-gray-700
              prose-strong:text-[#1e4d45] prose-strong:font-bold
              prose-ul:my-8 prose-ul:list-none prose-li:relative prose-li:pl-8 prose-li:mb-4 prose-li:text-xl
              prose-li:before:content-['✓'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:text-[#1e4d45] prose-li:before:font-bold
              prose-lead:text-2xl prose-lead:text-gray-600 prose-lead:font-medium prose-lead:leading-relaxed prose-lead:mb-8"
                        dangerouslySetInnerHTML={{ __html: activeTopic.content }}
                    />

                    {/* Interaction Footer */}
                    <footer className="mt-16 pt-10 border-t-2 border-gray-100">
                        <div className="bg-[#f4f9f7] rounded-3xl p-8 border border-[#e6f0ed]">
                            <h3 className="text-2xl font-bold text-[#1e4d45] mb-3">
                                Was this helpful?
                            </h3>
                            <p className="text-lg text-gray-700 mb-6">
                                Share this health guide with your friends or family members.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: activeTopic.title,
                                                text: `Read about ${activeTopic.title} on MyMittr`,
                                                url: window.location.href,
                                            });
                                        }
                                    }}
                                    className="flex items-center gap-2 bg-white border-2 border-[#1e4d45] text-[#1e4d45] px-6 py-3 rounded-xl font-bold hover:bg-[#f4f9f7] transition-colors shadow-sm"
                                >
                                    <span>📤</span> Share Article
                                </button>
                                <Link
                                    href="/services/community"
                                    className="flex items-center gap-2 bg-[#1e4d45] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#153a33] transition-colors shadow-lg shadow-[#1e4d45]/20"
                                >
                                    <span>💬</span> Discuss in Community
                                </Link>
                            </div>
                        </div>
                    </footer>

                </article>
            </main>
        </div>
    );
}
