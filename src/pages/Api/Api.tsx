import { Icon, Typography } from '@equinor/eds-core-react'
import { external_link as externalLink } from '@equinor/eds-icons'
import { InfoPageComponent } from '../../components/InfoPageComponent/InfoPageComponent'

export const Api = () => {
  return (
    <InfoPageComponent title="Using the PEPM API">
      <Typography variant="body_long">Api to come her soon!</Typography>
      <Typography link href="">
        Read all the API documentation on the Swagger page
        <Icon data={externalLink} title={'Link to Api'} />
      </Typography>
    </InfoPageComponent>
  )
}
