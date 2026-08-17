const facilities = [
  {
    title: 'Residences',
    body: 'Eight residence halls house first- and second-year students; upperclassmen may apply for apartment-style housing from year three.',
  },
  {
    title: 'Athletics',
    body: 'Twelve varsity teams compete in the regional inter-university league, alongside open intramural leagues every semester.',
  },
  {
    title: 'Clubs & Societies',
    body: 'Over sixty student-run clubs, from the robotics team to the debate union, each with a small annual grant from student council.',
  },
  {
    title: 'Health & Wellbeing',
    body: 'The campus health centre and counselling service are open to every enrolled student at no additional cost.',
  },
];

function CampusLife() {
  return (
    <div className="section-page">
      <p className="section-page__eyebrow">Campus Life</p>
      <h1>The part of an education that isn&rsquo;t on the transcript.</h1>
      <p className="section-page__overview">
        SNUC&rsquo;s OMR campus is built to hold more than classrooms: housing, athletics, student
        societies and everyday wellbeing all sit a short walk from every department.
      </p>

      <div className="card-grid">
        {facilities.map((facility, index) => (
          <div className="card card--static" key={facility.title}>
            <span className="card__index">{String(index + 1).padStart(2, '0')}</span>
            <h2>{facility.title}</h2>
            <p>{facility.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CampusLife;
