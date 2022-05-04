import React, {
    useContext,
    useState
    }   from 'react';
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

function Header(){
    const [optionSelect, setOptionSelect] = useState<string>('Albuns')
    return(
        <div className={styles.headerContainer}>
            <button
                onClick={() => {
                    setOptionSelect('Albuns')
                }}>
                <Link to='/'>
                    <h4>
                        Albuns dos nossos usuários
                    </h4>
                </Link>
            </button>
            <button
                onClick={() => {
                    setOptionSelect('Posts')
                }}>
                <Link to='/posts'>
                    <h4>
                        Posts dos nossos usuários
                    </h4>

                </Link>
            </button>

        </div>

    )
}

export default Header