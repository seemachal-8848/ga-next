// ChildTemplate.js
import React from 'react';

class ChildTemplate {
    constructor({ data }) {
        this.data = data;
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('child-template');

        const imgElement = document.createElement('img');
        imgElement.src = this.data.image.url; // Set the image URL
        imgElement.alt = 'Child Template Image';
        imgElement.style.width = '150px'; // Set width for image
        imgElement.style.float = 'left'; // Float left for layout

        const descriptionElement = document.createElement('div');
        descriptionElement.innerHTML = this.data.description;
        descriptionElement.style.marginLeft = '160px'; // Space for image

        container.appendChild(imgElement);
        container.appendChild(descriptionElement);

        return container;
    }

    static get toolbox() {
        return {
            title: 'Child Template',
            icon: '<svg>...</svg>', // Use appropriate icon here
        };
    }
}

export default ChildTemplate;
