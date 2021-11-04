import Icons, {Heart, Link} from './Icons'
import styles from './JokeList.module.css'


function JokeList({ randomJoke }) {


    return(
        <>
        <div className={styles.joke_block}>
            <span className={styles.icon_mess}>{Icons}</span>
            <div className={styles.jokes_block}>
                <div className={styles.updateNCategory}>
                <span className={styles.id_joke}>ID: <a href={randomJoke.url}>{randomJoke.id}<span>{Link}</span></a></span>
                <span className={styles.icon_heart}>{Heart}</span>
                </div>
                <p>{randomJoke.value}</p>
                <div className={styles.updateNCategory}>
                <span className={styles.update_joke}>Last updated: {randomJoke.updated_at}</span>
                <span className={styles.categories}>{randomJoke.categories}</span>
                </div>
            </div>

        </div>
        
        </>
    )
}

export default JokeList