import React from 'react'
import { Button, Modal } from 'antd';

 type BtnType = React.PropsWithChildren & {
    img: React.ReactNode,
     onClick: () => void
}
const Btn = ({ children, onClick, img }: BtnType) => {

    return (
        <div>
            <Button type='primary' onClick={onClick}>
                {children}
                {img}
            </Button>
        </div>
    )
}

export default Btn