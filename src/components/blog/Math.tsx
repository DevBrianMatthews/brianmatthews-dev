import katex from 'katex'
import 'katex/dist/katex.min.css'

interface Props {
    formula: string
    block?: boolean
}

export default function Math({ formula, block = false }: Props) {
    const html = katex.renderToString(formula, {
        throwOnError: false,
        displayMode: block,
    })

    if (block) {
        return (
            <div
                className="math-block"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        )
    }

    return (
        <span
            className="math-inline"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}