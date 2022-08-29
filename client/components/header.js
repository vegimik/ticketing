import Link from 'next/link';

export default ({currentUser})=>{
const links=[
    !currentUser && {href:'/auth/signup', as:'auth/signup', label:'Sign Up'},
    !currentUser && {href:'/auth/signin', as:'auth/signin', label:'Sign In'},
    currentUser && {href:'/auth/signout', as:'auth/signout', label:'Sign Out'}
]
.filter(link=>link)
.map(({href, as, label})=>{
    return <li href={href} as={as} key={as}
    className="nav-item">
        <Link href={href} as={as}>
            <a className="nav-link">{label}</a>
        </Link>
    </li>
})


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand">
                    GitTix
                </a>
            </Link>

            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {currentUser ? 'Sign out': 'Sign In/Up'}
                </ul>
            </div>
        </nav>

    )
}