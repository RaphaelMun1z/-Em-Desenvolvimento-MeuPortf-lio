import styles from './SoftSkillCard.module.scss'

// Icons
import { IoIosArrowForward } from "react-icons/io";
import { FaLaptopCode, FaStar, FaCode } from "react-icons/fa";

// Hooks
import { useIcon } from '../hooks/useIcon'

const SoftSkillCard = (skill) => {
    return (
        <div className={styles.techCard}>
            <div className={styles.iconContainer}>
                <div className={styles.insideIconContainer}>
                    {useIcon(skill.name)}
                    <p>{skill.name}</p>
                </div>
            </div>
        </div>
    )
}

export default SoftSkillCard