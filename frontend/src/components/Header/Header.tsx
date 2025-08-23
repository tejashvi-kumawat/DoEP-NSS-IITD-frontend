import styles from './Header.module.css';

const Header: React.FC = () => (
    <header className={`${styles.header} header`}>
        <div className="container flex justify-between items-center">
            <h1>NSS IITD</h1>
            <nav>
                <a href="/" className="btn btn-primary">Home</a>
                <a href="/projects" className="btn btn-primary">Projects</a>
                <a href="/login" className="btn btn-secondary">Login</a>
            </nav>
        </div>
    </header>
);

export default Header;