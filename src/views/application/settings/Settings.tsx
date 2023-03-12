import { useState, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks/redux-hooks';
import { RootState } from 'app/store';
import UpdatePassword from './components/UpdatePassword';
import { Profile } from '../assessmentV2/components';
import { default_logos, default_avatars, default_background_colors } from 'constants/v2/default_images';

const Settings: React.FC = (): ReactElement => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((root: RootState) => root.authentication);
  	const talentProfile = useAppSelector((root) => root.profile);
  	const userRole = user.userRole.toLowerCase();
  	const avatar = default_avatars[talentProfile.User.avatar ?? 1000];
	return (
		<div className='relative w-full h-screen overflow-x-hidden overflow-y-auto'>
	        <div className='ml-[150px] mr-[265px] pt-20 pb-[92px]'>
		        {userRole === 'freelancer' && (
		        	<div className="flex justify-between items-center">
		        		<Profile
			          		avatar={avatar ?? talentProfile.User.avatar}
			          		background={avatar ? default_background_colors[talentProfile.User.background_number ?? 1000] ?? '': ''}
			          		bgNumber={talentProfile.User.background_number}
			          		name={talentProfile.first_name + ' ' + talentProfile.last_name}
			          		status={talentProfile.Role?.name ?? ''}/>
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