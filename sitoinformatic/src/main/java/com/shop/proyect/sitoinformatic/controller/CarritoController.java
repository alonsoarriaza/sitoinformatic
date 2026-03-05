package com.shop.proyect.sitoinformatic.controller;

import com.shop.proyect.sitoinformatic.model.CarritoItem;
import com.shop.proyect.sitoinformatic.model.Component;
import com.shop.proyect.sitoinformatic.model.User;
import com.shop.proyect.sitoinformatic.repository.CarritoRepository;
import com.shop.proyect.sitoinformatic.repository.ComponentRepository;
import com.shop.proyect.sitoinformatic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CarritoController {

    @Autowired
    private CarritoRepository carritoRepo;
    @Autowired
    private ComponentRepository componentRepo;
    @Autowired
    private UserRepository userRepo;

    /**
     * El sistema recupera la lista completa de productos asociados a un usuario específico.
     */
    @GetMapping("/{userId}")
    public List<CarritoItem> obtenerCarrito(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElse(null);
        return carritoRepo.findByUser(user);
    }

    /**
     * Se procesa la inserción de un nuevo componente en la cesta o se incrementa la cantidad si ya existe.
     */
    @PostMapping("/add")
    public ResponseEntity<?> añadirAlCarrito(@RequestBody Map<String, Object> payload) {
        try {
            Long userId = Long.valueOf(payload.get("userId").toString());
            Long componentId = Long.valueOf(payload.get("componentId").toString());
            int quantity = Integer.parseInt(payload.get("quantity").toString());

            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Usuario no existe en BD (ID: " + userId + ")"));
            Component component = componentRepo.findById(componentId)
                    .orElseThrow(() -> new RuntimeException("Componente no existe en BD (ID: " + componentId + ")"));

            CarritoItem existente = carritoRepo.findByUserAndComponent(user, component);

            if (existente != null) {
                existente.setQuantity(existente.getQuantity() + quantity);
                carritoRepo.save(existente);
            } else {
                CarritoItem nuevo = new CarritoItem(user, component, quantity);
                carritoRepo.save(nuevo);
            }
            return ResponseEntity.ok("Producto añadido correctamente");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Fallo en el servidor: " + e.getMessage());
        }
    }

    /**
     * El sistema elimina un único registro del carrito mediante su identificador único.
     */
    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<?> eliminarDelCarrito(@PathVariable Long itemId) {
        carritoRepo.deleteById(itemId);
        return ResponseEntity.ok("Eliminado");
    }

    /**
     * Tras confirmar el pago, se procede a vaciar la cesta completa del usuario.
     * Este método elimina todos los registros vinculados al ID del cliente para finalizar el proceso de venta.
     */
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<?> vaciarCarritoCompleto(@PathVariable Long userId) {
        try {
            User user = userRepo.findById(userId).orElse(null);
            if (user != null) {
                // El sistema localiza todos los items del usuario
                List<CarritoItem> items = carritoRepo.findByUser(user);
                // Se procede al borrado masivo de los elementos encontrados
                carritoRepo.deleteAll(items);
                return ResponseEntity.ok("El carrito ha sido vaciado con éxito tras el pago.");
            }
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al vaciar el carrito: " + e.getMessage());
        }
    }
}