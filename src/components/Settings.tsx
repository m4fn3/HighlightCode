import {FormRow, FormSection, View, ScrollView, Image, Text, FormSwitch, FormInput} from 'enmity/components'
import {Constants, Navigation, React, StyleSheet, Toasts} from 'enmity/metro/common'
import {Linking} from "enmity/metro/common"
// @ts-ignore
import {name, version} from '../../manifest.json'
import {getIDByName} from "enmity/api/assets"
import {getByProps} from "enmity/modules"

const GitHubIcon = getIDByName('img_account_sync_github_white')
const DiscordIcon = getIDByName('Discord')
const TwitterIcon = getIDByName('img_account_sync_twitter_white')
const FailIcon = getIDByName('Small')

const Invites = getByProps('acceptInviteAndTransitionToInviteChannel')

export default ({settings}) => {
    const styles = StyleSheet.createThemedStyleSheet({
        container: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },
        image: {
            width: 70,
            height: 70,
            marginTop: 20,
            marginLeft: 20
        },
        title: {
            flexDirection: "column",
        },
        name: {
            fontSize: 30,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 30,
            color: Constants.ThemeColorMap.HEADER_PRIMARY,
        },
        author: {
            fontSize: 15,
            paddingLeft: 50,
            color: Constants.ThemeColorMap.HEADER_SECONDARY,
        },
        info: {
            height: 45,
            paddingTop: 3,
            paddingBottom: 3,
            justifyContent: "center",
            alignItems: "center"
        },
        footer: {
            color: Constants.ThemeColorMap.HEADER_SECONDARY,
            textAlign: 'center',
            paddingTop: 10,
            paddingBottom: 20
        }
    })
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    source={{uri: 'https://avatars.githubusercontent.com/u/43488869'}}
                    style={styles.image}
                />
                <View style={styles.title}>
                    <Text style={styles.name}>HighlightCode</Text>
                    <Text style={styles.author}>by mafu</Text>
                </View>
            </View>
            <FormSection title="SETTINGS">
                <FormRow
                    label="Show line numbers"
                    trailing={
                        <FormSwitch
                            value={settings.getBoolean("show_line_num", false)}
                            onValueChange={(value) => {
                                settings.set("show_line_num", value)
                            }}
                        />
                    }
                />
                {[1].filter(_ => settings.get("_tester")).map(() =>
                    <FormRow
                        label="Change the font to monospace"
                        trailing={
                            <FormSwitch
                                value={settings.getBoolean("change_font", false)}
                                onValueChange={(value) => {
                                    settings.set("change_font", value)
                                }}
                            />
                        }
                    />
                )}
                {[1].filter(_ => settings.get("_tester")).map(() =>
                    <FormInput
                        title="Font size of monospace"
                        value={settings.get("font_size", 10).toString()}
                        onSubmitEditing={(event) => {
                            if (isNaN(event.nativeEvent.text)) {
                                Toasts.open({
                                    content: `You entered an invalid number`,
                                    source: FailIcon
                                })
                            } else {
                                settings.set("font_size", Number(event.nativeEvent.text))
                            }
                        }}
                    />
                )}
            </FormSection>
            <FormSection title="INFORMATION">
                <FormRow
                    label="Follow me on Twitter"
                    style={styles.info}
                    trailing={FormRow.Arrow}
                    leading={<FormRow.Icon source={TwitterIcon}/>}
                    onPress={() => {
                        Linking.openURL("https://twitter.com/m4fn3")
                    }}
                />
                <FormRow
                    label="Visit my server for help"
                    style={styles.info}
                    trailing={FormRow.Arrow}
                    leading={<FormRow.Icon source={DiscordIcon}/>}
                    onPress={() => {
                        Invites.acceptInviteAndTransitionToInviteChannel({
                            inviteKey: 'TrCqPTCrdq',
                            context: {location: 'Invite Button Embed'},
                            callback: () => {
                                Navigation.pop()
                            }
                        })
                    }}
                    onLongPress={() => settings.set("_tester", !settings.get("_tester"))}
                />
                <FormRow
                    label="Check Source on GitHub"
                    style={styles.info}
                    trailing={FormRow.Arrow}
                    leading={<FormRow.Icon source={GitHubIcon}/>}
                    onPress={() => {
                        Linking.openURL("https://github.com/m4fn3/Test")
                    }}
                />
            </FormSection>
            <Text style={styles.footer}>
                {`v${version}`}
            </Text>
        </ScrollView>
    )
};