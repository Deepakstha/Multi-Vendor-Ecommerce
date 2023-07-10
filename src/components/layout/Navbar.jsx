import styles from "../../styles/styles"
import { navItems } from "../../static/data"
import { Link } from "react-router-dom"

const Navbar = ({ active }) => {
    return (
        <div className={`${styles.noramlFlex}`}>
            {
                navItems && navItems.map((data, index) => {
                    return (
                        <div className="flex">
                            <Link to={data.url} className={` ${active == index + 1 ? "text-[#17dd1f" : "text-[#fff]"} font-[500] px-6 cursor-pointer`} >{data.title}</Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Navbar