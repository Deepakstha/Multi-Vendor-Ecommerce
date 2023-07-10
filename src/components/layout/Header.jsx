import styles from '../../styles/styles'
import { categoriesData, productData } from "../../static/data"
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"
import { BiMenuAltLeft } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import DropDown from "./DropDown"
import Navbar from "./Navbar"


import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ activeHeading }) => {
    const [searchData, setSearchData] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [active, setActive] = useState(false)
    const [dropDown, setDropDown] = useState(false)

    const handleSearchChange = (e) => {
        e.preventDefault()
        const term = e.target.value
        setSearchTerm(term)
        const filteredProducts = productData.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        )
        setSearchData(filteredProducts)

    }
    window.addEventListener("scroll", () => {
        if (window.screenY > 70) {
            setActive(true)
        } else {
            setActive(false)
        }
    })
    return (
        <>
            <div className={`${styles.section}`}>
                <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
                    <div>
                        <Link to="/"><img src="https://agromart247.com/files/frontend/images/logo.png" alt="Logo" /></Link>
                    </div>

                    <div className='w-[50%] relative bg-green-500'>
                        <input className=' h-[40px] w-full px-2 border-[#3957db] border-2 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' type="text" placeholder='Search' value={searchTerm} onChange={handleSearchChange} />
                        <AiOutlineSearch size={30} className="absolute right-2 top-1 cursor-pointer" />
                        {
                            searchData && searchData.length !== 0 ? (
                                <div className="absolute min-h-[30vh] bg-slate-50 border-2 rounded-md">
                                    {
                                        searchData && searchData.map((data, index) => {
                                            const d = data.name
                                            const product_name = d.replace(/\s+/g, "-")
                                            return (
                                                <Link to={`/product/${product_name}`}>
                                                    <div className="w-full flex  items-start py-3">
                                                        <img src={data.image_Url[0].url} alt="" className='w-[40px] h-[40px] mr-[10px]' />
                                                        <h1>{data.name}</h1>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            ) : null
                        }

                    </div>
                    <div className={`${styles.button}`}>
                        <Link to="/seller">
                            <h1 className='flex items-center text-white'>Become Seller <IoIosArrowForward className='ml-1' /></h1>
                        </Link>
                    </div>
                </div>



            </div>

            <div className={`${active ? " left-0 right-0 top-0 shadow-sm fixed" : null} bg-slate-300 transition hidden 800px:flex items-center justify-between w-full `}>
                <div className={`${styles.section} relative ${styles.noramlFlex} justify-between `}>
                    <div>
                        <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block  ">
                            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                            <button className={`h-[90%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] rounded select-none`}>
                                All Categorys
                            </button>
                            <IoIosArrowDown size={20} className="absolute right-2 top-4 cursor-pointer" onClick={() => setDropDown(!dropDown)} />
                            {
                                dropDown ? (
                                    <DropDown
                                        categoriesData={categoriesData}
                                        setDropDown={setDropDown}
                                    />
                                ) : null
                            }

                        </div>


                    </div>
                    <div className={`${styles.noramlFlex}`}>
                        <Navbar active={activeHeading} />
                    </div>
                    <div>
                        <div className={`${styles.noramlFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]">
                                <AiOutlineHeart size={30} color="rgb(255 2554 255/83%)" />
                                <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>0</span>
                            </div>
                            <div className="relative cursor-pointer mr-[15px]">
                                <AiOutlineShoppingCart size={30} color="rgb(255 2554 255/83%)" />
                                <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>0</span>
                            </div>
                            <div className="relative cursor-pointer mr-[15px]">
                                <CgProfile size={30} color="rgb(255 2554 255/83%)" />
                                <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header