import { COMPANY_SERVICE_BASE_URL } from '../config/config';

export const createCompany = async (company) => {
  try {
    console.log(company);
    const response = await fetch(`${COMPANY_SERVICE_BASE_URL}/createCompany`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating company', error);
  }
};
