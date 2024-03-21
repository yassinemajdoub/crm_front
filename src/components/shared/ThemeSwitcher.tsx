"use client"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
// import { useTheme } from "next-themes"
export default function ThemeSwitcher() {
    // const { setTheme, theme } = useTheme()


    const sunAnimation = useAnimation()
    const [theme, setTheme] = useState<"dark" | "light">("dark")
    const moonAnimation = useAnimation()


    useEffect(() => {
        if (theme === "dark") {
            moonAnimation.start({ display: "block", opacity: 1, y: 0 })
            sunAnimation.start({ display: "none", opacity: 0, y: 20 })
        }
        if (theme === "light") {
            moonAnimation.start({ display: "none", opacity: 0, y: -20 })
            sunAnimation.start({ display: "block", opacity: 1, y: 0 })
        }
    }, [theme])

    const toggleMode = () => {

        // setTheme(theme === "dark" ? "light" : "dark")
        setTheme((prev) => {
            return prev == "light" ? "dark" : "light"
        })
    }
    return <button onClick={toggleMode} className=" relative h-[30px] w-[30px] -mr-[8px]   rounded-md">
        <motion.div className="absolute top-0" initial={{ opacity: 0, y: 20 }} animate={sunAnimation}>
            <Moon className="stroke-black/80 w-[30px] h-[30px]" />
        </motion.div>
        <motion.div className="top-0 absolute" initial={{ display: "none", opacity: 0, y: -100 }} animate={moonAnimation}>
            <Sun className="stroke-black/80 w-[30px] h-[30px]" />
        </motion.div>
    </button>


}
