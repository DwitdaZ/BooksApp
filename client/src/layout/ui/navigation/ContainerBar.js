import React from 'react';

import {
    Button,
    Collapse,
    Navbar,
    NavbarBrand,
    Nav, NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem 
} from 'reactstrap';

const containerBar = props => {
    return (
        <Navbar color="secondary" dark expand="md">
          <NavbarBrand className="ml-5" href="void(0)"><strong>Books R Us</strong></NavbarBrand>
          <Collapse isOpen="true" navbar>
            <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar className="mx-5">
                    <DropdownToggle nav caret>
                        Filter
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            Title
                        </DropdownItem>
                        <DropdownItem>
                            Author
                        </DropdownItem>
                        <DropdownItem>
                            Book Id
                        </DropdownItem>
                        <DropdownItem>
                            Date
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem className="mx-5">
                    <Button color="primary" onClick={props.toggleAdd}>Add A New Book</Button>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
}

export default containerBar;