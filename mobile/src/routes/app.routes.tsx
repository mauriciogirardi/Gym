import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'

import { Exercise } from '@screens/Exercise'
import { Profile } from '@screens/Profile'
import { History } from '@screens/History'
import { Home } from '@screens/Home'

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'
import { useTheme } from 'native-base'
import { SvgProps } from 'react-native-svg'
import { Platform } from 'react-native'

type AppRouteTypes = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: undefined
}

type RenderIconProps = {
  icon: React.FC<SvgProps>
  color: string
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRouteTypes>

const { Navigator, Screen } = createBottomTabNavigator<AppRouteTypes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()

  const renderIcon = ({ icon: Icon, color }: RenderIconProps) => {
    const iconSize = sizes[7]
    return <Icon fill={color} width={iconSize} height={iconSize} />
  }

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green['500'],
        tabBarInactiveTintColor: colors.gray['300'],
        tabBarStyle: {
          backgroundColor: colors.gray['600'],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[8],
          paddingTop: sizes[8],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => renderIcon({ color, icon: HomeSvg }),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => renderIcon({ color, icon: HistorySvg }),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => renderIcon({ color, icon: ProfileSvg }),
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
