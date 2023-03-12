// import { render, fireEvent, screen } from '@testing-library/react';
// // import Onboarding from "views/onboarding"
// import FirstStep from "views/onboarding/first/FirstStep"
// import SecondStep from "views/onboarding/second/SecondStep"
// import ThirdStep from "views/onboarding/third/ThirdStep"
// // import FourthStep from "views/onboarding/fourth"
// import FifthStep from "views/onboarding/fifth/FifthStep"
// import SixthStep from "views/onboarding/sixth/SixthStep"
// import FormInput from "components/forms/FormInput/FormInput"
// import { renderWithProviders } from '../test-utils'

// // import mockFetch from './mockFetch';

// const setNextStepEnabled = (enabled) => {}

test("renders FormInput Component", () => {
  //   const { queryByLabelText, getByLabelText } = render(<FormInput
  //     label='First Name'
  //     name='firstName'
  //     placeholder='First'
  //     className='text-[18px]'
  //     onChange={(e) =>{}}
  //   />);
});

// describe('<FirstStep /> component', () => {
//   let ui, onboardUI;

//   beforeEach(() => {
//     ui = renderWithProviders(
//       <FirstStep setNextStepEnabled={(enable) => setNextStepEnabled(enable)} />
//     );
//   });

//   it('Render <FirstStep> component', () => {
//     expect(ui.container.querySelector('[name="firstName"]')).toBeInTheDocument();
//   });

//   it('Fill the all inputs', () => {
//     const firstNameInput = ui.container.querySelector('[name="firstName"]')
//     const lastNameInput = ui.container.querySelector('[name="lastName"]')
//     const companyInput = ui.container.querySelector('[name="experience-company-0"]');
//     const positionInput = ui.container.querySelector('[name="experience-position-0"]');
//     const SummaryInput = ui.container.querySelector('[name="experience-summary-0"]');
//     const experinceDateFrom = ui.container.querySelector('[name="experience-date-01"]');
//     const experinceDateTo = ui.container.querySelector('[name="experience-date-02"]');
//     const collegeDateFrom = ui.container.querySelector('[name="college-1"]');
//     const collegeDateTo = ui.container.querySelector('[name="college-2"]');
//     const collegeInput = ui.container.querySelector('[name="college-college-0"]');
//     const majorInput = ui.container.querySelector('[name="college-major-0"]');

//     fireEvent.change(firstNameInput, {target: {value: 'Alexis'}});
//     fireEvent.change(lastNameInput, {target: {value: 'Tanaka'}});
//     fireEvent.change(companyInput, {target: {value: 'Outdefine'}});
//     fireEvent.change(positionInput, {target: {value: 'Full Stack Dev'}});
//     fireEvent.change(SummaryInput, {target: {value: 'I am working as a full stack dev'}});
//     fireEvent.change(collegeInput, {target: {value: 'Osaka University'}});
//     fireEvent.change(majorInput, {target: {value: 'Computer Science'}});

//     let date1 = '2022-02', date2 = '2022-03'

//     for(let i = 0 ; i < date1.length ; i++) {
//       fireEvent.keyDown(experinceDateFrom, {key: date1[i]});
//       fireEvent.keyDown(collegeDateFrom, {key: date1[i]});
//       fireEvent.keyDown(experinceDateTo, {key: date2[i]});
//       fireEvent.keyDown(collegeDateTo, {key: date2[i]});
//     }

//     expect(firstNameInput.value).toBe('Alexis');
//     expect(lastNameInput.value).toBe('Tanaka');
//     expect(companyInput.value).toBe('Outdefine');
//     expect(positionInput.value).toBe('Full Stack Dev');
//     expect(experinceDateFrom.value).toBe('2022-02');
//     expect(experinceDateTo.value).toBe('2022-03');
//     expect(SummaryInput.value).toBe('I am working as a full stack dev');
//     expect(collegeInput.value).toBe('Osaka University');
//     expect(majorInput.value).toBe('Computer Science');
//     expect(experinceDateFrom.value).toBe('2022-02');
//     expect(experinceDateTo.value).toBe('2022-03');

//   })

// });

// describe('<Second /> component', () => {
//   let ui2;

//   beforeEach(() => {

//     ui2 = renderWithProviders(
//       <SecondStep setNextStepEnabled={(enable) => setNextStepEnabled(enable)} />
//     );
//   });

//   it('Render <SecondStep> component', () => {

//     expect(screen.getByText("What is your job type?")).toBeInTheDocument();
//     // expect(ui2.container.querySelector('#job')).toBeInTheDocument();
//   });

//   it('Fill the all inputs', () => {
//     const skillSelect = ui2.container.querySelector('[name="skill-type"]');
//     expect(screen.getByText("Engineering")).toBeInTheDocument();
//     // fireEvent.click(screen.getByText("Engineering"));
//     // expect(screen.getByText("Frontend Engineer"));
//     // fireEvent.click(skillSelect);
//     // expect(screen.getByText("React")).toBeInTheDocument();
//     // fireEvent.click(screen.getByText("React"));
//   })
// });

// describe('renders ThirdStep', () => {
//   let ui;
//   ui = renderWithProviders(
//     <ThirdStep setNextStepEnabled={(enable) => setNextStepEnabled(enable)} />
//   );
// });
// // test('renders FourthStep', () => {
// //   renderWithProviders(<FourthStep setNextStepEnabled={(enabled) => setNextStepEnabled(enabled)}/>);
// // });
// describe('renders FifthStep', () => {
//   let ui;
//   beforeEach(() => {
//     ui = renderWithProviders(
//       <FifthStep setNextStepEnabled={(enable) => setNextStepEnabled(enable)} />
//     );
//   });

//   it('Render <FifthStep> component', () => {
//     expect(screen.getByText("Bio Summary")).toBeInTheDocument();
//   });

//   it('Fill the all inputs', () => {
//     const bioInput = ui.container.querySelector('[name="bio-summary"]');
//     expect(bioInput).toBeInTheDocument();
//     fireEvent.change(bioInput, {target: {value: 'hello world'}});
//     expect(bioInput.value).toBe('hello world');

//   });
// });
// test('renders SixthStep', () => {
//   renderWithProviders(<SixthStep setNextStepEnabled={(enabled) => setNextStepEnabled(enabled)}/>);
// });

// // beforeEach(() => {
// //   jest.spyOn(window, "fetch").mockImplementation(mockFetch);
// // })

// // afterEach(() => {
// //   jest.restoreAllMocks()
// // });
