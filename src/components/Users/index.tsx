import {
    useEffect,
    useState
} from 'react';

import styles from './styles.module.scss'

import { api } from '../../services/api';

import Header from '../Header'

type UserProps = {
    id: number,
    name: string,
    userName: string
}

type AlbumProps = {
    id: number,
    title: string,
}

type PhotoProps = {
    id: number,
    title: string,
    thumb: string
}

function Users(){
    const [usersList, setUsers] = useState<Array<UserProps>>();
    const [userSelect, setUserSelect] = useState<number>(); 
    const [albumList, setAlbumList] = useState<Array<AlbumProps>>();
    const [albumSelect, setAlbumSelect] = useState<number>(); 
    const [photoList, setPhotoList] = useState<Array<PhotoProps>>() 
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const { data } = await api.get('/users/')

            const users = data.map((user:any) => {
                return{
                    id: user.id,
                    name: user.name,
                    userName: user.username,
                }
            })
            
            setUsers(users)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAlbuns = async () => {
        setLoading(true)
        try {
            const { data } = await api.get(`/users/${userSelect}/albums`);

            const albums = data.map((album:any) => {
                return{
                    id: album.id,
                    title: album.title,
                }
            })

            setAlbumList(albums);
            setLoading(false)
        } catch (error) {
          console.log(error)   
        }
    }

    const fetchPhotos = async () => {
        setLoading(true)
        try {
            const { data } = await api.get(`/albums/${albumSelect}/photos`);

            const photos = data.map((photo:any) => {
                return {
                    id: photo.id,
                    title: photo.title,
                    thumb: photo.thumbnailUrl
                }
            })

            setPhotoList(photos);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    },[])

    useEffect(() => {
        fetchAlbuns()
    },[userSelect])

    useEffect(() => {
        fetchPhotos()
    },[albumSelect])

    return(
        
        <div className={styles.container}>
            <Header/>
            <ul className={styles.userList}>
            {
                loading ?
                <h2>Carregando...</h2>
                :
                usersList?.map(user => {
                    return(
                        <li key={user.id}>
                            <button 
                                className={
                                    userSelect == user.id ?
                                    styles.userActive
                                    :
                                    styles.userOff
                                }
                                onClick={() => {
                                    userSelect == user.id
                                    ?
                                    setUserSelect(-1)
                                    :
                                    setUserSelect(user.id)
                                }}>
                                <h4>{user.name}</h4>
                                <h5>({user.userName})</h5>
                            </button>
                            <div className={albumList ?
                                styles.albumContainer
                                :
                                styles.albumContainerOff
                                }>
                                    <ul className={
                                        userSelect == user.id
                                        ? styles.albumList
                                        : styles.albumListOff}>
                                            <h2>Albuns:</h2>
                                        {
                                            loading ?
                                            <h3>Carregando...</h3>
                                            :
                                            (albumList && albumList.length == 0)
                                            ? <h2>Este usuário não possui albuns</h2>
                                            : albumList?.map(album => {
                                                return(
                                                    <li key={album.id}>
                                                        <button
                                                            onClick={() => {
                                                                albumSelect == album.id
                                                                ? setAlbumSelect(-1)
                                                                :setAlbumSelect(album.id)}}>
                                                            <p>{album.title}</p>
                                                        </button>
                                                        <div className={styles.photoContainer}>
                                                            <ul className={
                                                                albumSelect == album.id
                                                                ? styles.photoList
                                                                : styles.photoListOff}>
                                                                {
                                                                    loading ?
                                                                    <h5>Carregando...</h5>
                                                                    :
                                                                    photoList?.map(photo => {
                                                                        return(
                                                                            <li key={photo.id}>
                                                                                <img src={photo.thumb} alt={photo.title} />
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
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default Users