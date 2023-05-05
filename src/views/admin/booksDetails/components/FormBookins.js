import React, {useState, useEffect } from "react";

// Chakra imports
import {
  Flex,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Select,
  Spinner
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { constants } from "Constants";
import Card from "components/card/Card";
import { ModalConfirmDelete } from "./ModalConfirmDelete";
import DatePicker from "react-multi-date-picker";
import moment from "moment";
import InputIcon from "react-multi-date-picker/components/input_icon";

export const FormBookins = (props) => {
    const {...rest } = props;

    const iconColor = useColorModeValue("brand.500", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const shadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "none"
    );
    const bg = useColorModeValue("white", "navy.900");
    
    const [openDelete, setOpenDelete] = useState(false)

    const [localizador, setLocalizador] = useState('')
    const [fechaAlta, setFechaAlta] = useState('')
    const [fechaEntrada, setFechaEntrada] = useState('')
    const [fechaSalida, setFechaSalida] = useState('')
    const [estado, setEstado] = useState('pendiente')
    const [adultos, setAdultos] = useState(0)
    const [ninos, setNinos] = useState(0)
    const [bebes, setBebes] = useState(0)
    const [alojamiento, setAlojamiento] = useState('')
    const [precio, setPrecio] = useState('')
    const [nombreViajero, setNombreViajero] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const [book, setBook] = useState({})
    const [range, setRange] = useState([])
    const [properties, setProperties] = useState([])

    const navigate = useNavigate();

    const session = JSON.parse(sessionStorage.getItem('login-user'))

    // get book by id
    const getBookById = async (id) => {
        setLoading(true);
        const response = await fetch(`${constants.urlLocal}book/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (response.ok) {
            setBook({
                localizador: data.localizador,
                fechaAlta: data.fecha_alta,
                fechaEntrada: data.fecha_entrada,
                fechaSalida: data.fecha_salida,
                nombreViajero: data.nombre_viajero,
                estado: data.estado,
                adultos: data.adultos,
                ninos: data.ninos,
                bebes: data.bebes,
                alojamiento: data.alojamiento,
                precio: data.precio,
                _id: data._id,
            })
            setLoading(false);
        }
        setLocalizador(data.localizador);
        setFechaAlta(data.fecha_alta);
        setFechaEntrada(data.fecha_entrada);
        setFechaSalida(data.fecha_salida);
        setEstado(data.estado);
        setNombreViajero(data.nombre_viajero);
        setAdultos(data.adultos);
        setNinos(data.ninos);
        setBebes(data.bebes);
        setAlojamiento(data.alojamiento);
        setPrecio(data.precio);
        
    };

    const getRange = async () => {
        const response = await fetch(`${constants.urlLocal}range/${session.user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (response.ok) {
            setRange(data);
        }
    };

    const getProperties = async () => {
        try {
          const response = await fetch(`${constants.urlLocal}property/${session.user}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setProperties(data);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        if (navigate.location.state) {
            getBookById(navigate.location.state.book._id);
            getProperties();
            getRange();
        } else {
            navigate.push("/admin/books");
        }
    }, []);

    const updateBook = async (book) => {
        const response = await fetch(`${constants.urlLocal}book/${book._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                localizador,
                fecha_alta: new Date(fechaAlta).toISOString(),
                fecha_entrada: new Date(fechaEntrada).toISOString(),
                fecha_salida: new Date(fechaSalida).toISOString(),
                estado,
                nombre_viajero: nombreViajero,
                adultos,
                ninos,
                bebes,
                alojamiento,
                precio,
            }),
        });
        const data = await response.json();
        navigate.push("/admin/books");
    };

    const deleteBook = async (id) => {
        const response = await fetch(`${constants.urlLocal}book/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        navigate.push("/admin/books");
    };

    const cancelDelete = () => {
        setOpenDelete(false)
    }

    const cancelButton = () => {
        setDisabled(!disabled)
        setLocalizador(book.localizador);
        setFechaAlta(book.fecha_alta);
        setFechaEntrada(book.fecha_entrada);
        setFechaSalida(book.fecha_salida);
        setEstado(book.estado);
        setAdultos(book.adultos);
        setNinos(book.ninos);
        setBebes(book.bebes);
        setAlojamiento(book.alojamiento);
        setPrecio(book.precio);
    }

  return (
    // create a form for the bookings
    <div>
        <Card boxShadow={shadow} py='10px' bg={bg} {...rest}>
        {!loading ? 
            <div>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <FormControl id="localizador" isRequired>
                    <FormLabel>Localizador</FormLabel>
                    <Input color={textColor}
                        className="rmdp-calendar rmdp-calendar--open"
                        disabled={disabled}
                        type="text"
                        value={localizador}
                        onChange={(e) => setLocalizador(e.target.value)}
                    />
                </FormControl>
                <FormControl id="fechaAlta" isRequired>
                    <FormLabel>Fecha Alta</FormLabel>
                    <Input color={textColor}
                        disabled={disabled}
                        type="date"
                        value={fechaAlta && new Date(fechaAlta).toISOString().split("T")[0]}
                        onChange={(e) => setFechaAlta(e.target.value)}
                    />
                    
                </FormControl>
                <FormControl id="fechaEntrada" isRequired>
                    <FormLabel>Fecha Entrada</FormLabel>
                    <Input color={textColor}
                        disabled={disabled}
                        type="date"
                        value={fechaEntrada && new Date(fechaEntrada).toISOString().split("T")[0]}
                        onChange={(e) => setFechaEntrada(e.target.value)}
                    />
                    {/* <DatePicker
                        style={{
                            width: "100%",
                            boxSizing: "border-box",
                            height: "2.5rem"
                        }}
                        containerStyle={{
                            width: "100%"
                        }}
                        disabled={disabled}
                        selected={fechaEntrada && moment(fechaEntrada).format('DD/MM/YYYY')}
                        onChange={(e) => setFechaEntrada(moment(e).format('DD/MM/YYYY'))}
                        mapDays={({date}) => {
                            const day = date.day;
                            const month = date.month;
                            const year = date.year;
                            let dateStr = '';
                            if (day < 10) {
                                dateStr = `${year}-0${month}-${day}`
                            } else {
                                dateStr = `${year}-${month}-${day}`
                            } 
                            
                            const dateFormatted = moment(dateStr).format("YYYY-MM-DD"); 

                            let props = {};
                            range.days.map((day) => {
                                if (day === dateFormatted) {
                                    props = {
                                        style: {
                                            backgroundColor: "red",
                                            color: "white",
                                        },
                                        disabled: true,
                                    };
                                }
                            });
                            return props;
                        }}
                    /> */}
                </FormControl>
                <FormControl id="fechaSalida" isRequired>
                    <FormLabel>Fecha Salida</FormLabel>
                    <Input color={textColor}
                        disabled={disabled}
                        type="date"
                        value={fechaSalida && new Date(fechaSalida).toISOString().split("T")[0]}
                        onChange={(e) => setFechaSalida(e.target.value)}
                    />
                    {/* <DatePicker
                        style={{
                            width: "100%",
                            boxSizing: "border-box",
                            height: "2.5rem"
                        }}
                        containerStyle={{
                            width: "100%"
                        }}
                        disabled={disabled}
                        selected={fechaSalida && moment(fechaSalida)}
                        onChange={(e) => setFechaSalida(moment(e).format('DD/MM/YYYY'))}
                        mapDays={({date}) => {
                            const day = date.day;
                            const month = date.month;
                            const year = date.year;
                            let dateStr = '';
                            if (day < 10) {
                                dateStr = `${year}-0${month}-${day}`
                            } else {
                                dateStr = `${year}-${month}-${day}`
                            } 
                            
                            const dateFormatted = moment(dateStr).format("YYYY-MM-DD"); 

                            let props = {};
                            range.days.map((day) => {
                                if (day === dateFormatted) {
                                    props = {
                                        style: {
                                            backgroundColor: "red",
                                            color: "white",
                                        },
                                        disabled: true,
                                    };
                                }
                            });
                            return props;
                        }}
                    /> */}
                </FormControl>
                <FormControl id="estado" isRequired>
                    <FormLabel>Estado</FormLabel>
                    <Select onChange={(e) => setEstado(e.target.value)}
                    color={textColor}
                    disabled={disabled}
                    value={estado}
                    bg={
                        estado === "confirmada"
                            ? "green.500"
                            : estado=== "pendiente"
                            ? "orange.500"
                            : null
                        } 
                        >
                        <option value='pendiente'>Pendiente</option>
                        <option value='confirmada'>Confirmada</option>
                    </Select>
                </FormControl>
                {estado === "confirmada" ?
                    <FormControl id="alojamiento" isRequired>
                        <FormLabel>Nombre viajero</FormLabel>
                        <Input color={textColor}
                            type="text"
                            disabled={disabled}
                            value={nombreViajero}
                            onChange={(e) => setNombreViajero(e.target.value)}
                        />
                    </FormControl>
                : null}
                <FormControl id="adultos" isRequired>
                    <FormLabel>Adultos</FormLabel>
                    <Input color={textColor}
                        type="number"
                        disabled={disabled}
                        value={adultos}
                        onChange={(e) => setAdultos(e.target.value)}
                    />
                </FormControl>
                <FormControl id="ninos" isRequired>
                    <FormLabel>Niños</FormLabel>
                    <Input color={textColor}
                        type="number"
                        disabled={disabled}
                        value={ninos}
                        onChange={(e) => setNinos(e.target.value)}
                    />
                </FormControl>
                <FormControl id="bebes" isRequired>
                    <FormLabel>Bebés</FormLabel>
                    <Input color={textColor}
                        type="number"
                        disabled={disabled}
                        value={bebes}
                        onChange={(e) => setBebes(e.target.value)}
                    />
                </FormControl>
                <FormControl id="alojamiento" isRequired>
                    <FormLabel>Alojamiento</FormLabel>
                    <Select onChange={(e) => setAlojamiento(e.target.value)}
                    color={textColor}
                    disabled={disabled}
                    value={alojamiento}
                    >
                        <option value=''>Selecciona un alojamiento</option>
                        {properties.map((property) => (
                            <option key={property._id} value={property.name}>{property.name}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl id="precio" isRequired>
                    <FormLabel>Precio</FormLabel>
                    <Input color={textColor}
                        type="number"
                        disabled={disabled}
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </FormControl>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Flex justifyContent="flex-start" mt={6}>
                    <Button color={textColor}
                        colorScheme="red"
                        variant="outline"
                        ml={3}
                        onClick={() => {
                            setOpenDelete(true);
                        }}
                    >
                        Eliminar
                    </Button>
                </Flex>
                <Flex justifyContent="flex-end" mt={6}>
                    {!disabled && <Button color={textColor}
                        colorScheme="brand"
                        variant="outline"
                        mr={3}
                        onClick={cancelButton}
                    >
                        Cancelar
                    </Button>}
                    <Button
                        colorScheme="brand"
                        onClick={() => {
                            setDisabled(!disabled);
                            if (!disabled) {
                                updateBook(book);
                            }
                        }}
                    >
                        {disabled ? "Editar" : "Guardar"}
                    </Button>
                </Flex>
            </Grid>
            <ModalConfirmDelete openDelete={openDelete} cancelDelete={cancelDelete} book={book} deleteBook={deleteBook} />

            </div> : 
                <div>
                    <Spinner />
                </div>
        }
        </Card>
    </div>
    );
};