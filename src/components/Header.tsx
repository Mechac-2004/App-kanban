import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-inner">
        {/* Gauche */}
        <div className="header-left">
          <button className="menu-btn" aria-label="Menu">
            ☰
          </button>
          <span className="menu-title">Boards</span>
        </div>

        {/* Milieu */}
        <h1 className="logo">
          Kanban<span className="logo-accent">Flow</span>
        </h1>

        {/* Droite */}
        <div className="header-right">
          <span aria-label="Notifications">🔔</span>
          <span aria-label="Help">❓</span>
          <div className="avatar">KK</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
