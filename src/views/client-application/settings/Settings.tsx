import { useState, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';
import { RootState } from 'app/store';
import UpdatePassword from './components/UpdatePassword';
import { default_logos, default_avatars } from 'constants/v2/default_images';

const Settings: React.FC = (): ReactElement => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((root: RootState) => root.authentication);
  	const companyProfile = useAppSelector((root) => root.companyprofile);
  	const userRole = user.userRole.toLowerCase();

	return (
		<div className='relative w-full h-screen overflow-x-hidden overflow-y-auto'>
	        <div className='ml-[150px] mr-[265px] pt-20 pb-[92px]'>
		        {userRole === 'client' && (
		        	<div className="flex justify-between items-center">
					    <div className='flex gap-x-6'>
					        {companyProfile.company.logo ? (
				              <img
				                src={
				                  default_logos[companyProfile.company.logo] ??
				                  companyProfile.company.logo
				                }
				                width={100}
				                height={100}
				                alt='comapny logo'
				                className='min-w-[40px] rounded-full overflow-hidden mb-3'
				              />
				            ) : (
				              	<div className='min-w-[40px] w-10 h-10 rounded-full bg-theme/50 p-1 mb-3'>
				                	<div className='w-full h-full bg-theme rounded-full'></div>
				              	</div>
				            )}
					        <div className='flex flex-col justify-center'>
					          <p className='font-poppins font-semibold text-[20px]'>Hello {companyProfile.company.name}</p>
					          <span className='mt-2 font-inter text-xs font-semibold text-inactive-gray'>{companyProfile.company.industry}</span>
					        </div>
					    </div>
					    <img
	        				src={'common/spaceboy/astro-camera.png'}
	        				width={230}
	        				height={217}
	        				alt='astro camera'
	      				/>
					</div>
		        )}
		        <UpdatePassword/>
		    </div>
			
		</div>
	);
}

export default Settings;