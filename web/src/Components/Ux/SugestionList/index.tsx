const PatientSuggestionList = ({ isSearching, suggestedPatients }) => {
  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      {isSearching ? (
        <div>Loading...</div>
      ) : (
        <datalist id="patients-list">
          {suggestedPatients.map((patient) => (
            <option key={patient.id} value={patient.name}>
              {patient.name}
            </option>
          ))}
        </datalist>
      )}
    </div>
  )
}

export default PatientSuggestionList
