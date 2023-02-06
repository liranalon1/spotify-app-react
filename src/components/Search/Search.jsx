import "./Search.scss";

export default function Search({placeholder, value, change}) {
    return (
        <>
            <input
                className="search-input"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => change(e.target.value)}
            />
        </>
    )
}