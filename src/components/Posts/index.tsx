import {
    useEffect,
    useState
} from 'react'
import { api } from '../../services/api'
import Header from '../Header'
import {
    AiFillDelete, 
    AiFillEdit,
    AiOutlineCheck,
    AiFillEye
} from 'react-icons/ai'

import styles from './styles.module.scss'

type UserProps = {
    id: number,
    userName: string,
}

type PostProps = {
    id: number,
    title: string,
    body: string,
    comments: Array<string>
}

type CommentProps = {
    id: number,
    name: string,
    body: string,
    email: Array<string>
}

function Posts(){
    const [userPost, setUserPost] = useState<UserProps>()
    const [postList, setPostList] = useState<Array<PostProps>>();
    const [commentsList, setCommentsList] = useState<Array<CommentProps>>();
    const [postSelect, setPostSelect] = useState<number>(-1);
    const [titleEdit, setTitleEdit] = useState<string>('');
    const [bodyEdit, setBodyEdit] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true);
    const [onEdit, setOnEdit] = useState<boolean>(false);

    const handleChangeTitle = (event:any) => {
        setTitleEdit(event.target.value)
    }
    const handleChangeBody = (event:any) => {
        setBodyEdit(event.target.value)
    }

    const fetchUser = async () => {
        setLoading(true)
        try {
            const { data } = await api.get('users/1/')

            const user = {
                id: data.id,
                userName: data.username,
            }
            setUserPost(user)
            setLoading(false)
        } catch (error) {
            alert(error)
        }
    }

    const fetchPosts = async () => {
        setLoading(true)
        try {
            const { data } = await api.get('users/1/posts')

            const posts = data.map((post:any) => {
                return{
                    id: post.id,
                    title: post.title,
                    body: post.body,
                }
            })
            setPostList(posts)
            setLoading(false)
        } catch (error) {
            alert(error)
        }
    }

    const fetchComments = async (post:number) => {
        setLoading(true)
        try {
            const {data} = await api.get(`/posts/${post}/comments`);

            const comments = data.map((comment:any) => {
                return{
                    id: comment.id,
                    email: comment.email,
                    name: comment.name,
                    body: comment.body
                }
            })
            setCommentsList(comments)

            setLoading(false)
            console.log(commentsList)
        } catch (error) {
            alert(error)
        }
    }

    const editPost = async (post:number) => {
        setLoading(true)
        try {
            const {data} = await api.put(`/posts/${post}`, {
                title: titleEdit,
                body:bodyEdit,
            })
            setOnEdit(false)
            let aux:any = postList
            for(let i =0; i<aux.length; i++){
                if(aux[i].id == post){
                    aux[i] = JSON.parse(JSON.stringify(data)) 
                }
            }
            setPostList(aux)
            setLoading(false)
            alert(JSON.stringify(data))
        } catch (error) {
            alert(error)
        }
    }

    const deletePost = async (post:number) => {
        setLoading(true)
        try {
            const {data} = await api.delete(`/posts/${post}`)

            alert(`deletado post ${post}`)
            const aux = postList?.filter((item => {return item.id != post}))
            setPostList(aux)
            setLoading(false)
            console.log(aux)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
        fetchPosts()
    },[])

    return(
        <div className={styles.container}>
            <Header/>
            <ul className={styles.postList}>
                {
                    loading ?
                    <h4>Carregando...</h4>
                    :
                    postList?.map(post => {
                        return(
                            <li key={post.id}>
                                <div 
                                    className={styles.post}
                                >
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                        <h2>{userPost?.userName}-</h2>
                                        {
                                        onEdit && postSelect == post.id
                                        ? <input type='text' value={titleEdit} onChange = {handleChangeTitle} />
                                        :
                                        <h3>{post.title}</h3>
                                        }
                                    </div>
                                    <div className={styles.options}>
                                        <a onClick={() => {
                                        postSelect == post.id
                                        ? setPostSelect(-1)
                                        : 
                                        setPostSelect(post.id)
                                        fetchComments(post.id)
                                        }}
                                        >
                                            <AiFillEye
                                              size={30} />
                                        </a>
                                        <a onClick={() => {
                                            setPostSelect(post.id)
                                            setTitleEdit(post.title)
                                            setBodyEdit(post.body)
                                            setOnEdit(!onEdit)}
                                        }>
                                            <AiFillEdit 
                                                size={30} 
                                                color = {'#9164FA'}
                                            />
                                        </a>
                                        <a onClick={() => {
                                            editPost(post.id)}}
                                            >
                                            <AiOutlineCheck 
                                                size={30} 
                                                color = {'#04D361'}/>
                                        </a>
                                        <a onClick={() => {
                                            deletePost(post.id)
                                            }}>
                                            <AiFillDelete 
                                                size={30} 
                                                color = {'red'} 
                                            />
                                        </a>
                                    </div>

                                </div>
                            
                                <div className={
                                    postSelect == post.id
                                    ? styles.postContainer
                                    : styles.postContainerOff}>
                                    {
                                    onEdit && postSelect == post.id
                                    ? <input type='text' value={bodyEdit} onChange = {handleChangeBody} />
                                    : <h4>{post.body}</h4>
                                    }

                                    <ul className={styles.listComments}>
                                        {
                                            commentsList?.map(comment => {
                                                return(
                                                    <li key={comment.id}>
                                                        <div style={{
                                                            display: 'flex', 
                                                            flexDirection: 'row', 
                                                            alignItems: 'center', 
                                                            marginTop: '0.5rem'}}
                                                        >
                                                            <h4>{comment.email}-</h4>
                                                            <h5>{comment.name}</h5>
                                                        </div>
                                                        <p>{comment.body}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Posts