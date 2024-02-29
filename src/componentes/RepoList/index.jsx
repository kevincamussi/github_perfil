import styles from './ReposList.module.css';
import { useEffect, useState } from "react";

const RepoList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);

    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => res.json())
        .then(resJson =>{
            setTimeout(() => {
                setEstaCarregando(false);
                setRepos(resJson);
            }, 3000);
            console.log(resJson)
        })
        
    }, [nomeUsuario]);

    return (
        <div className='container'>
            {estaCarregando ? ( 
                <h1>Carregando...</h1> 
                ) : (  
                    <ul className={styles.list}>
                        {/* {repos.map( (repositorio) => ( */}
                        {repos.map( ({id, name, language, html_url}) => (
                            // o mesmo que repositorio.id ,  repositorio.name, repositorio.language e repositorio.html_url
                            <li key={id} className={styles.listItem}>
                                <div className={styles.itemName}>
                                    <b>Nome: {name}</b> 
                                </div>
                                <div className={styles.itemLanguage}>
                                    <b>Linguagem: {language}</b> <br />
                                </div>
                                <a className={styles.itemLink} target="_blank" href={html_url}>Visitar no Github</a>
                            </li>
                        ))}
                    </ul>  
                )}
        </div>
    )
}

export default RepoList;

// https://api.github.com/users/kevincamussi/repos
