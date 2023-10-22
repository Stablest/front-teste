import { IUser } from "@/utils/interfaces/IUser"
import { Page, View, Document, Text } from "@react-pdf/renderer"

export interface PDFUserDocumentProps {
    users: IUser[]
}

function PDFUserDocument({ users }: PDFUserDocumentProps) {
    return (
        <Document>
            {
                users.map((user, index) =>
                    <Page key={index} size={'A4'} style={{ textAlign: 'left', margin: 40 }}>
                        <View>
                            <Text>
                                Nome: {user.name}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Login: {user.login}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                CPF: {user.cpf}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                E-mail: {user.email}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Telefone: {user.phone}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                CEP: {user.postalCode}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Endereço: {user.adress}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Número: {user.adressNumber.toString()}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Complemento: {user.complement}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Bairro: {user.neighborhood}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Cidade: {user.city}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Estado: {user.state}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Data De Nascimento: {new Date(user.birthDate).toLocaleString()}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                Permissão: {user.permission.toString()}
                            </Text>
                        </View>
                    </Page>)
            }
        </Document>
    )
}

export { PDFUserDocument }