import { useNavigate } from "react-router-dom"
import styles from '../../styles/styles'


const DropDown = ({ categoriesData, setDropDown }) => {
    const navigate = useNavigate()
    const submitHandler = (e) => {
        navigate(`/products?category=${e.title}`)
        setDropDown(false)
        window.location.reload()
    }
    return (
        <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
            {
                categoriesData && categoriesData.map((data, index) => (
                    <div key={index} className={`${styles.noramlFlex} cursor-pointer hover:bg-slate-50`} onClick={() => submitHandler(i)}>
                        <img src={data.image_Url} style={{ width: "25px", height: "25px", objectFit: "contain", marginLeft: "10px", userSelect: "none" }} />
                        <h1 className="m-3 select-none ">{data.title}</h1>
                    </div>
                ))
            }
        </div>
    )
}

export default DropDown