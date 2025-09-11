import AuthService from '../services/auth-service';
import AuthAppRepository from '../repositories/auth-app-repository';
import ClientGenerator from '../services/client-generator';

export default function (): AuthService {
    return new AuthService(
        new AuthAppRepository(),
        new ClientGenerator()
    )
}
