import { Button } from "./style"

export const Checkbox = ({checked, onClick}) => {
    return (
        <Button checked={checked} onClick={onClick}/>
    )
}