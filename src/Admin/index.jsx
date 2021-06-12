import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import { objectToFormData, usePost, useRequest } from "../utils/request";
import { translationsToString } from "../utils/word";
import { range } from 'lodash';
import { Link } from "react-router-dom";
import Loading from "../Loading";
import Input from "../Input";
import './style.scss'

const getWordByIndex = (language, index) => {
    if (language && language[index] && language[index].text) {
        return language[index].text;
    } else {
        return null;
    }
};

const Admin = () => {

    const {loading, data, refetch} = useRequest('/user_is_admin');
    const [page, setPage] = useState(0)
    const [selectedWord, setSelectedWord] = useState(null)
    const { push } = useHistory();

    useEffect(() => {
        if (loading && selectedWord) setSelectedWord(null)
    }, [loading, selectedWord])

    useEffect(() => {
        if (data && !data.is_admin) return push("/");
    }, [data, push])

    const handleClose = () => refetch();
    
    if (selectedWord) return <UpdateWordForm selectedWord={!loading && selectedWord} close={handleClose}/>

    return (
        <div id="admin">
            <Loading loading={loading}>

                <Link to="/">Back</Link>

                <div id="pagination">
                    <button onClick={() => setPage(page-1)}>-1</button>
                    <p>Page {page+1}</p>
                    <button onClick={() => setPage(page+1)}>+1</button>
                </div>

                <WordsList page={page} setSelectedWord={setSelectedWord}/>
            </Loading>
        </div>
    )
}

const WordsList = ({page, setSelectedWord}) => {

    const {loading, data} = useRequest(`/all_words?page=${page}`);

    if (loading) return <p>Loading . . .</p>;

    return (
        <div id="word-list">
            { data.all_words.map((word, index) => {
                return <div key={index} className="word-list-item">
                    <button onClick={() => setSelectedWord(word)}>Edit</button>
                    
                    <div className={'translation-detail'}>
                        <p className={'mono small'}>English</p>
                        <p>{ translationsToString(word.english) }</p>
                    </div>

                    <div className={'translation-detail'}>
                        <p className={'mono small'}>Spanish</p>
                        <p>{ translationsToString(word.spanish) }</p>
                    </div>
                </div>
            })}
        </div>
    )
    
}

const UpdateWordForm = ({selectedWord, close}) => {

    const { handleSubmit, control } = useForm();
    const { post, loading, result } = usePost()

    useEffect(() => {
        if (!loading && result && result.data.success) close()
    }, [close, loading, result])

    const onSubmit = data => {
        const {spanish_1, spanish_2, spanish_3, spanish_4} = data
        const {english_1, english_2, english_3, english_4} = data

        const postData = {
            word_id: selectedWord.id,
            spanish_translations: [spanish_1, spanish_2, spanish_3, spanish_4].filter(i => (i && i !== "")),
            english_translations: [english_1, english_2, english_3, english_4].filter(i => (i && i !== ""))
        }

        const formData = objectToFormData(postData)
        post('/update_word_translations', formData, true);
    }

    const english = useMemo(() => selectedWord.english, [selectedWord])
    const spanish = useMemo(() => selectedWord.spanish, [selectedWord])

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="update-form">
            <Loading>
                <div className="update-form-input-group">
                    <h3>Spanish</h3>

                    { range(4).map( i => (
                        <Controller
                            key={i}
                            name={`spanish_${i+1}`}
                            control={control}
                            defaultValue={ getWordByIndex(spanish, i) }
                            render={({ field: { onChange } }) => (
                                <Input 
                                    spanish 
                                    defaultValue={ getWordByIndex(spanish, i) }
                                    name={`spanish_${i+1}`} 
                                    onChange={onChange}
                                />
                            )}
                        />
                    ))}
                </div>

                <div className="update-form-input-group">
                    <h3>English</h3>
                    { range(4).map( i => (
                        <Controller
                            key={i}
                            name={`english_${i+1}`}
                            control={control}
                            defaultValue={ getWordByIndex(english, i) }
                            render={({ field: { onChange } }) => (
                                <Input 
                                    name={`english_${i+1}`} 
                                    onChange={onChange}
                                    defaultValue={ getWordByIndex(english, i) }
                                />
                            )}
                        />
                    ))}

                </div>

                <input type="submit" />
            </Loading>
        </form>
    )
    
}

export default Admin;