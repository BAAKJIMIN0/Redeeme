import styles from './GameIcon.module.css'

type GameIconProps = {
  src: string
  selected?: boolean
}

function GameIcon({ src, selected = false }: GameIconProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${selected ? styles.active : ''}`}
    >
      <img className={styles.img} src={src} alt="" />
    </button>
  )
}
export default GameIcon