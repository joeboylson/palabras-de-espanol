// styles
import './style.scss'

const Word = ({word, hideEnglish=false, hideSpanish=false}) => {

    const englishString = word.english.map(i => i.text).join(' / ')
    const spanishString = word.spanish.map(i => i.text).join(' / ')

    return (
        <div>
            {!hideEnglish && <p>{englishString}</p> }
            {!hideSpanish && <p>{spanishString}</p> }
        </div>
    )
}

export default Word;