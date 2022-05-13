import React, { useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import { useSelector } from 'react-redux';
import { getData } from '../store/method';
import { useDispatch } from 'react-redux';

const ExpanseList = () => {
	const { expenses } = useSelector((state) => state.AppReducer);
	const [filteredExpenses, setfilteredExpenses] = useState(expenses || []);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getData())
		setfilteredExpenses(expenses);
	}, [expenses]);

	const handleChange = (event) => {
		const searchResults = expenses.filter((filteredExpense) =>
			filteredExpense.name.toLowerCase().includes(event.target.value)
		);
		setfilteredExpenses(searchResults);
	};

	return (
		<>
			<input
				type='text'
				class='form-control mb-2 mr-sm-2'
				placeholder='Type to search...'
				onChange={handleChange}
			/>
			<ul className='list-group'>
				{filteredExpenses.map((expense) => (
					<ExpenseItem id={expense._id}
						name={expense.name}
						cost={expense.cost}
					/>
				))}
			</ul>
		</>
	);
};

export default ExpanseList;