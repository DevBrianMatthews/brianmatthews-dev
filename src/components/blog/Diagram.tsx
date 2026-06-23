import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    darkMode: true,
    flowchart: {
        curve: 'basis',
        useMaxWidth: true,
        htmlLabels: true,
        nodeSpacing: 50,
        rankSpacing: 50,
        diagramPadding: 20,
    },
    themeVariables: {
        primaryColor: 'transparent',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#00ff88',
        lineColor: '#5D6679',
        secondaryColor: 'transparent',
        tertiaryColor: 'transparent',
        background: 'transparent',
        mainBkg: 'transparent',
        nodeBorder: '#00ff88',
        clusterBkg: 'transparent',
        titleColor: '#ffffff',
        edgeLabelBackground: 'transparent',
        fontFamily: 'Geist Mono, monospace',
    },
})

interface Props {
    code: string
}

export default function Diagram({ code }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [svg, setSvg] = useState<string>('')
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const id = `mermaid-${Math.random().toString(36).slice(2)}`

        mermaid.render(id, code)
            .then(({ svg }) => {
                console.log('SVG generado:', svg.slice(0, 200))
                setSvg(svg)
                setError('')
            })
            .catch((err) => {
                console.error('Error Mermaid:', err)
                setError('Error en el diagrama: verifica la sintaxis!')
            })
    }, [code])

    if (error) {
        return (
            <div className="diagram-error">
                {error}
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className="diagram-wrapper"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    )
}