import { useState, useMemo, useEffect, useRef } from 'react'
import '../../styles/blog-search.css'


interface Post {
    id: string
    data: {
        title: string
        date: Date
        tags: string[]
    }
}

interface Props {
    posts: Post[]
    tagFrequency: Record<string, number>
}

function getTopTags(tags: string[], tagFrequency: Record<string, number>): string[] {
    return [...tags]
        .sort((a, b) => (tagFrequency[b] || 0) - (tagFrequency[a] || 0))
        .slice(0, 3)
}

export default function BlogSearch({ posts, tagFrequency }: Props) {
    const [search, setSearch] = useState('')
    const [filterOpen, setFilterOpen] = useState(false)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [dateFilter, setDateFilter] = useState<'all' | 'recent' | 'oldest'>('all')

    const allTags = useMemo(() => {
        return Object.entries(tagFrequency)
            .sort((a, b) => b[1] - a[1])
            .map(([tag]) => tag)
    }, [tagFrequency])

    const filteredPosts = useMemo(() => {
        let result = [...posts]

        if (search.trim()) {
            const query = search.toLowerCase()
            result = result.filter(
                (post) =>
                    post.data.title.toLowerCase().includes(query) ||
                    post.data.tags.some((tag) => tag.toLowerCase().includes(query))
            )
        }

        if (selectedTags.length > 0) {
            result = result.filter((post) =>
                selectedTags.every((tag) => post.data.tags.includes(tag))
            )
        }

        if (dateFilter === 'recent') {
            result = result.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
        } else if (dateFilter === 'oldest') {
            result = result.sort((a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime())
        }

        return result
    }, [posts, search, selectedTags, dateFilter])

    function toggleTag(tag: string) {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        )
    }

    function formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        })
    }

    const filterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setFilterOpen(false)
            }
        }

        if (filterOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [filterOpen])

    return (
        <div className="search-wrapper">
            <div className="top-bar" ref={filterRef}>
                <a href="/" className="back-btn">&#8249;</a>
                <div className="search-bar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for a post"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button
                    className={`filter-btn ${filterOpen ? 'active' : ''}`}
                    onClick={() => setFilterOpen(!filterOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                        <line x1="11" y1="18" x2="13" y2="18" />
                    </svg>
                </button>

                {filterOpen && (
                    <div className="filter-panel">
                        <div className="filter-section">
                            <p className="filter-label">Filter by tags</p>
                            <div className="filter-tags">
                                {allTags.map((tag) => (
                                    <button
                                        key={tag}
                                        className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="filter-section">
                            <p className="filter-label">Filter by date</p>
                            <div className="filter-tags">
                                {(['all', 'recent', 'oldest'] as const).map((option) => (
                                    <button
                                        key={option}
                                        className={`filter-tag ${dateFilter === option ? 'active' : ''}`}
                                        onClick={() => setDateFilter(option)}
                                    >
                                        {option === 'all' ? 'Todo' : option === 'recent' ? 'Recientes' : 'Antiguos'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <p className="section-label">Recent Post</p>

            <div className="posts-list">
                {filteredPosts.length === 0 ? (
                    <p className="no-results">No posts found.</p>
                ) : (
                    filteredPosts.map((post) => (
                        <a key={post.id} href={`/blog/${post.id}`} className="post-card">
                            <h2 className="post-title">{post.data.title}</h2>
                            <div className="post-meta">
                                <span className="post-date">{formatDate(post.data.date)}</span>
                                <div className="post-tags">
                                    {getTopTags(post.data.tags, tagFrequency).map((tag) => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </a>
                    ))
                )}
            </div>
        </div>
    )
}