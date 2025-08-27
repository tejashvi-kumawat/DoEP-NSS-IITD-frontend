import styles from './Home.module.css';

const Home = () => (
    <section className={`${styles.hero} hero-section`}>
        <div className="container text-center">
            <h1>Welcome to NSS IITD</h1>
            <p className="text-muted">Digitizing educational projects.</p>
            <a href="/projects" className="btn btn-primary">Explore Projects</a>
        </div>
    </section>
);

export default Home;