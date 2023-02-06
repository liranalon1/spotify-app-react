import "./NoResults.scss";

export default function NoResults({value}) {
    return (
        <div className="no-results flex">
            <h1>No results found for "{value}"</h1>
            <p>Please make sure your words are spelled correctly or use less or different keywords.</p>
        </div>
    )
}