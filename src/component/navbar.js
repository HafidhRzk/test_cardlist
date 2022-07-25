import { Nav } from 'react-bootstrap'

export default function Navbar() {
    return (
        <div className='navbar'>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link eventKey="link-2">Card</Nav.Link>
            </Nav>
        </div>
    )
}