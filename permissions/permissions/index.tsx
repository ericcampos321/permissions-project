import { Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import DashBoardComponent from '../../components/ui/dashboard';
import { FaCirclePlus, FaStarOfLife } from "react-icons/fa6";
import CollapsibleTable from '@/components/ui/tables/tablePermissionComponent';
import { useEffect, useState } from 'react';
import InputComponent from '@/components/ui/InputComponent';
import api from '@/api/api';
import userAuth from "@/hooks/userAuth"
import accessDenied from '../../../public/assets/403.svg';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteComponentModal from '@/components/ui/DeleteModalComponent';
import FormUserRegisterModal from '@/components/modals/Users/FormUserRegisterModal';
import { filterPermissionProps } from '@/models/interface/IPermission';
import { IPermission, IPermissionList } from '@/models/interface/IPermission';
import FormPermissionRegisterModal from '@/components/modals/Permission/FormPermissionRegister';

const PermissionPageComponent = () => {
    // Filter
    const [nameFilter, setNameFilter] = useState<string>('');
    const [filterPermission, setFilterPermission] = useState<filterPermissionProps>({
        name: ''
    });

    // Functions
    const [columns, setColumn] = useState<[]>([]);
    const [permissionList, setPermissionList] = useState<[]>([]);
    const [openNfcDownload, setOpenNfcDownload] = useState<boolean>(false);
    const [auth, setAuth] = useState<boolean>(true);
    const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [limit, setLimit] = useState<number>(10);
    const [limits, setLimis] = useState([10, 50, 100, 250]);
    const [openRegisterViewModal, setOpenRegisterViewModal] = useState<boolean>(false);
    const [openRegisterEditModal, setOpenRegisterEditModal] = useState<boolean>(false);

    // User info
    const [refPermission, setRefPermission] = useState<string>('');

    const openModal = () => setOpenRegisterModal(true);
    const closeRegister = () => setOpenRegisterModal(false);

    useEffect(() => {
        const getAuth = async () => {
            const user = await userAuth('permission');
            setAuth(user);
        }
        getAuth();
        getAllPermission(filterPermission);
    }, []);

    const updateAcitve = async (refPermission: string, active: boolean) => {
        try {
            await api.put(`/permission/update/${refPermission}`, {
                "active": active
            });

            getAllPermission(filterPermission);
        } catch (err) {
            console.log(err);
        }
    }

    const getAllPermission = async (filter: filterPermissionProps) => {
        try {
            const response = await api.post(`/permission/list/${limit}/0`, { filter });
            if (response && response.data && response.status == 200) {
                setPermissionList(response.data.data);
                setColumn(response.data.columns);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const applyFilter = async (e?: any) => {
        e.preventDefault();
        setLoading(true);

        setFilterPermission({
            name: nameFilter
        });
    };

    const clearFilter = async (e?: any) => {
        if (e?.preventDefault) e.preventDefault();

        setNameFilter('');
        setFilterPermission({
            name: '',
        });
    };

    const openViewModal = (ref: string) => {
        setRefPermission(ref);
        setOpenRegisterViewModal(true);
    }
    const closeRegisterView = () => setOpenRegisterViewModal(false);

    const openEditModal = (ref: string) => {
        setRefPermission(ref);
        setOpenRegisterEditModal(true);
    }
    const closeRegisterEdit = () => setOpenRegisterEditModal(false);

    const handleSelectedLimit = (limit: number) => setLimit(limit);

    return (
        <div className='overflow-hidden'>
            <DashBoardComponent />
            <div className="w-10/12 absolute right-0 top-28 flex flex-col gap-2 pr-4">
                {
                    !auth ? (
                        <div className='bottom-6 z-10 w-full flex items-center justify-center flex-col'>
                            <div className='relative w-1/2 h-full flex items-center justify-center'>
                                <Image src={accessDenied} alt='access_denied' className='aboslute w-full h-full object-cover' />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-2">
                                <Typography variant='h5' className='flex items-center p-3 rounded'>Grupo de Usuários</Typography>
                                <FaCirclePlus onClick={() => openModal()} className='text-primary size-9 cursor-pointer' />
                            </div>
                            <div className="flex flex-col gap-5 h-full relative">


                                <Paper className='flex justify-between p-2 flex-wrap'>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        <div className='w-52'>
                                            <InputComponent label='Nome' type='text' value={nameFilter} change={(e) => setNameFilter(e.target.value)} name='Nome' required={false} />
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-2 flex-wrap justify-center p-4">
                                        <Button style={{ backgroundColor: '#7AB756' }} onClick={(e) => clearFilter(e)} variant="contained"><ClearIcon className='text-white' /></Button>
                                        <Button style={{ backgroundColor: '#7AB756' }} onClick={(e) => applyFilter(e)} variant="contained">Filtrar</Button>
                                    </div>
                                </Paper>
                                {
                                    loading ? (
                                        <div className="flex justify-center items-center h-40">
                                            <CircularProgress style={{ color: '#7AB756' }} />
                                        </div>
                                    ) : (
                                        <>
                                            {permissionList && permissionList.length > 0 ? (
                                                <CollapsibleTable view={openViewModal} edit={openEditModal} list={permissionList} column={columns} limits={limits} limit={limit} updatePermissionActive={updateAcitve} />
                                            ) : <Typography variant='h5' >Não existe permissões criadas ainda</Typography>}
                                        </>
                                    )
                                }
                                <div className='w-full'>
                                    <div className="flex flex-col w-20 gap-1">
                                        <select required name='User' id='User'
                                            className="block rounded-md py-2 px-2 border-gray-300 border-2 focus:border-primary outline-none bg-white">
                                            {limits.map((result) => (
                                                <option onClick={(e) => handleSelectedLimit(result)} value={result} key={result}>{result}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
            </div>
            {openRegisterModal ? <FormPermissionRegisterModal close={closeRegister} operation={'insert'} /> : null}
            {openRegisterViewModal ? <FormPermissionRegisterModal close={closeRegisterView} operation='view' refPermission={refPermission} /> : null}
            {openRegisterEditModal ? <FormPermissionRegisterModal close={closeRegisterEdit} operation='edit' refPermission={refPermission} /> : null}
        </div>
    )
}

export default PermissionPageComponent;
