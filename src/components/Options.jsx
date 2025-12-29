function Options({ onLeaveFeedback, onReset, hasFeedback }) {
    return (
        <div>
            <button onClick={() => onLeaveFeedback("good")}>Good</button>
            <button onClick={() => onLeaveFeedback("neutral")}>Neutral</button>
            <button onClick={() => onLeaveFeedback("bad")}>Bad</button>
            {hasFeedback && (
                <button onClick={onReset}>Reset</button>
            )}
        </div>
    );
}

export default Options;