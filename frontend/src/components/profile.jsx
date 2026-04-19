function Profile({ user }) {
  return (
    <section className="section profile-section">
      <div className="section-heading">
        <p className="eyebrow">Profile</p>
        <h2>Your Yojana Setu account</h2>
        <p>Review the basic account details currently stored for this session.</p>
      </div>

      <article className="profile-card">
        <div className="profile-row">
          <span className="profile-label">Full name</span>
          <strong>{user?.fullName || 'Not available'}</strong>
        </div>
        <div className="profile-row">
          <span className="profile-label">Email</span>
          <strong>{user?.email || 'Not available'}</strong>
        </div>
        <div className="profile-row">
          <span className="profile-label">Account status</span>
          <strong>Logged in</strong>
        </div>
      </article>
    </section>
  )
}

export default Profile
