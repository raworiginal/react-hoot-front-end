import { useState } from "react";

const CommentForm = (props) => {
	const [formData, setFormData] = useState({ text: "" });

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.handleAddComment(formData);
		setFormData({ text: "" });
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="text-input'">Comment:</label>
			<textarea
				name="text"
				id="text-input"
				required
				value={formData.text}
				onChange={handleChange}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

export default CommentForm;
