import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { objectToFormData, usePost, useRequest } from "../utils/request";
import Word from "../Word";
import './style.scss'

const Admin = () => {

    const {loading, data, refetch} = useRequest('/user_is_admin');
    const [page, setPage] = useState(0)
    const [selectedWord, setSelectedWord] = useState(null)

    useEffect(() => {
        if (loading && selectedWord) setSelectedWord(null)
    }, [loading, selectedWord])

    if (loading) return <p>Loading . . .</p>;
    if (data && !data.is_admin) return <Redirect to="/"/>;

    const handleClose = () => {
        refetch();
    }

    return (
        <div>

            { selectedWord && !loading && 
                <UpdateWordForm selectedWord={!loading && selectedWord} close={handleClose}/>
            }

            <button onClick={() => setPage(page+1)}>+1</button>
            <WordsList page={page} setSelectedWord={setSelectedWord}/>
        </div>
    )
}

const WordsList = ({page, setSelectedWord}) => {

    const {loading, data} = useRequest(`/all_words?page=${page}`);

    if (loading) return <p>Loading . . .</p>;

    return (
        <div id="words-list">
            { data.all_words.map((word, index) => {
                return <div key={index}>
                    <Word word={word} key={index}/>
                    <button onClick={() => setSelectedWord(word)}>Edit</button>
                </div>
            })}
        </div>
    )
    
}

const UpdateWordForm = ({selectedWord, close}) => {

    const { register, handleSubmit } = useForm();
    const { post, loading, result } = usePost()

    useEffect(() => {
        if (!loading && result && result.data.success) close()
    }, [close, loading, result])

    const onSubmit = data => {

        const {spanish_1, spanish_2, spanish_3, spanish_4} = data
        const {english_1, english_2, english_3, english_4} = data

        const postData = {
            word_id: selectedWord.id,
            spanish_translations: [spanish_1, spanish_2, spanish_3, spanish_4].filter(i => i !== ""),
            english_translations: [english_1, english_2, english_3, english_4].filter(i => i !== "")
        }

        const formData = objectToFormData(postData)
        post('/update_word_translations', formData, true);
    }

    const getWordByIndex = (language, index) => {
        if (language && language[index] && language[index].text) {
            return language[index].text;
        } else {
            return null;
        }
    };

    const {spanish, english} = selectedWord;

    if (loading) return <p>Loading . . .</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <p>Spanish</p>
                <input name="spanish_1" {...register("spanish_1")} defaultValue={ getWordByIndex(spanish, 0) }/>
                <input name="spanish_2" {...register("spanish_2")} defaultValue={ getWordByIndex(spanish, 1) }/>
                <input name="spanish_3" {...register("spanish_3")} defaultValue={ getWordByIndex(spanish, 2) }/>
                <input name="spanish_4" {...register("spanish_4")} defaultValue={ getWordByIndex(spanish, 3) }/>
            </div>

            <div>
                <p>English</p>
                <input name="english_1" {...register("english_1")} defaultValue={ getWordByIndex(english, 0) }/>
                <input name="english_2" {...register("english_2")} defaultValue={ getWordByIndex(english, 1) }/>
                <input name="english_3" {...register("english_3")} defaultValue={ getWordByIndex(english, 2) }/>
                <input name="english_4" {...register("english_4")} defaultValue={ getWordByIndex(english, 3) }/>
            </div>

            <input type="submit" />

        </form>
    )
    
}

export default Admin;