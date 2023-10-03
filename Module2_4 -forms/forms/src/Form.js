import { useState, useRef } from 'react';
import styles from '../src/Form.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const Form = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		repeatedPassword: '',
		emailError: null,
		passwordError: null,
		repeatedPasswordError: null,
	});

	const { email, password, repeatedPassword } = formData;

	const submitButtonRef = useRef(null);

	const onEmailChange = ({ target }) => {
		const newEmail = target.value;

		setFormData((formData) => ({
			...formData,
			email: newEmail,
			emailError: null,
		}));

		let newError = null;

		if (
			!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(newEmail)
		) {
			newError = 'Неверный формат почты';
		} else {
			return;
		}

		setFormData((formData) => ({
			...formData,
			emailError: newError,
		}));
	};

	const onPasswordChange = ({ target }) => {
		const newPassword = target.value;

		setFormData((formData) => ({
			...formData,
			password: newPassword,
			passwordError: null,
		}));

		let newError = null;

		if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/g.test(newPassword)) {
			newError =
				'Пароль должен содержать хотя бы одно число, спецсимвол, хотя бы одну латинскую букву в нижнем и верхнем регистрах';
		} else if (target.value.length < 8) {
			newError = 'Должно быть не менее 8 символов';
		}

		setFormData((formData) => ({
			...formData,
			passwordError: newError,
		}));
	};

	const onRepeatedPasswordChange = ({ target }) => {
		const newRepeatedPassword = target.value;

		setFormData((formData) => ({
			...formData,
			repeatedPassword: newRepeatedPassword,
			repeatedPasswordError: null,
		}));

		let newError = null;

		if (newRepeatedPassword !== formData.password) {
			newError = 'Пароли не совпадают!';
		} else {
			return;
		}

		setFormData((formData) => ({
			...formData,
			repeatedPasswordError: newError,
		}));
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(formData);
		submitButtonRef.current.focus();
	};

	return (
		<div className={styles.form}>
			<form onSubmit={onSubmit}>
				{formData.emailError && (
					<div className={styles.errorLabel}>{formData.emailError}</div>
				)}
				{formData.passwordError && (
					<div className={styles.errorLabel}>{formData.passwordError}</div>
				)}
				{formData.repeatedPasswordError && (
					<div className={styles.errorLabel}>
						{formData.repeatedPasswordError}
					</div>
				)}
				<input
					name="email"
					type="email"
					placeholder="Почта"
					value={email}
					onChange={onEmailChange}
				/>
				<input
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={onPasswordChange}
				/>
				<input
					name="repeatedPassword"
					type="password"
					placeholder="Повторите пароль"
					value={repeatedPassword}
					onChange={onRepeatedPasswordChange}
				/>
				<button
					type="submit"
					ref={submitButtonRef}
					disabled={
						!!formData.emailError ||
						!!formData.passwordError ||
						!!formData.repeatedPasswordError
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
