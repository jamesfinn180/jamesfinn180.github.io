// James Finn portfolio site

const setYear = (className) => {
	const spans = document.getElementsByClassName(className);
	const currYear = new Date().getFullYear();
	for (let i=0; i<spans.length; i++) {
		const span = spans[i]
		const initYear = parseInt(span.innerText, 10)
		span.innerText = currYear - initYear
	}
}

const setYearsExp = (className) => {
	const spans = document.getElementsByClassName(className);
	const currYear = new Date().getFullYear();
	for (let i=0; i<spans.length; i++) {
		const span = spans[i]
		const initYear = parseInt(span.innerText, 10)
		span.innerText = `(${currYear - initYear} yrs exp)`
	}
}

const showModal = (content) => {
	const { title, subtitle, text, img } = content.dataset;
	let { links, skills } = content.dataset;
	links = JSON.parse(links)
	skills = JSON.parse(skills)

	const [titleHTML, subtitleHTML, skillsHTML, textHTML, linksHTML, imgHTML] = [
		document.getElementById('modalTitle'),
		document.getElementById('modalSubtitle'),
		document.getElementById('modalSkills'),
		document.getElementById('modalText'),
		document.getElementById('modalLinks'),
		document.getElementById('modalImg'),
	];

	console.log(title, text, skills, links)
	console.log(skills)

	const modal = document.getElementById('modal');
	modal.classList.add('modal--open');

	titleHTML.innerText = title;
	subtitleHTML.innerText = subtitle;
	textHTML.innerText = text;
	imgHTML.src = img;
	
	skillsHTML.innerHTML = '';
	linksHTML.innerHTML = '';

	links.forEach((link) => {
		const li = document.createElement('li');
    const anchor = document.createElement('a');
		const icon = document.createElement('i');

		li.className = 'modal__item'

    anchor.href = link.href;
		if (link.label.toLowerCase().includes('github')) {
			icon.className = 'devicon-github-original';
		} else {
			icon.className = 'fa fa-link';
		}
		li.appendChild(icon);
	
		anchor.textContent = link.label; 

    li.appendChild(anchor);

    linksHTML.appendChild(li);
	})

	skills.forEach((skill) => {
		skillsHTML.appendChild(createLangIcon(skill));
	})
}



const createLangIcon = (lang) => {
	const icon = document.createElement('i');
	icon.className = `devicon-${lang.toLowerCase()}`;
	return icon;
}

const hideModal = () => {
	const modal = document.getElementById('modal');
	modal.classList.remove('modal--open');
}

const appendClickHandlers = () => {
	document.querySelectorAll('.portfolio__item').forEach(portfolio => {
    portfolio.addEventListener('click', function() {
        showModal(this);
    });
	});
}

const PORTFOLIO_DATA = {
	diceApp: {
		title: 'Dice App',
		text: 'Dice app text here',
		skills: ''
	}
}

// Call on Page Load
setYear('years')
setYearsExp('years-exp')
appendClickHandlers()