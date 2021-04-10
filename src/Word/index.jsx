// styles
import './style.scss'

const Word = ({word, hideEnglish=false, hideSpanish=false}) => {

    const englishString = word.english.map(i => i.text).join(' / ')
    const spanishString = word.spanish.map(i => i.text).join(' / ')

    return (
        <div className={'word'}>
            <p className={'word-id mono small'}>{word.id}</p>

            {!hideEnglish && <div className={'word-item'}>
                <p className={'word-item-prefix mono small'}>E</p>
                <p>{englishString}</p>
            </div>}

            {!hideSpanish && <div className={'word-item'}>
                <p className={'word-item-prefix mono small'}>S</p>
                <p>{spanishString}</p>
            </div>}

        </div>
    )
}

export default Word;